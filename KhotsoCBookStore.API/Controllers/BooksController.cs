using AutoMapper;
using KhotsoCBookStore.API.Models;
using KhotsoCBookStore.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Controllers
{
    [Produces("application/json", "application/xml")]
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BooksController(
            IBookRepository bookRepository,
            IMapper mapper)
        {
            _bookRepository = bookRepository ?? throw new ArgumentNullException(nameof(bookRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }


        /// <summary>
        /// List of all the actions that are allows with this API
        /// </summary>
        /// <returns>An IActionResult of actions allowed</returns>
        [HttpOptions]
        public IActionResult GetBooksAPIOptions()
        {
            Response.Headers.Add("Allow", "GET,OPTIONS,POST,DELETE,PUT,PATCH");
            return Ok();
        }

        /// <summary>
        /// Get all the books
        /// </summary>
        /// <returns>An ActionResult of type Book</returns>
        /// <response code="200">Returns the requested books</response>
        /// <response code="404">Returns no books found</response>
        [HttpGet()]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesDefaultResponseType]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks()
        {
            var booksFromRepo = await _bookRepository.GetAllBooksAsync();
            return Ok(_mapper.Map<IEnumerable<BookDto>>(booksFromRepo));
        }

        /// <summary>
        /// Get a book by id
        /// </summary>        
        /// <param name="bookId">The id of the book</param>
        /// <returns>An ActionResult of type Book</returns>
        /// <response code="200">Returns the requested book</response>
        /// <response code="404">Returns no book is found</response>
        /// <response code="400">Returns bad request sent</response>
        [HttpGet("{bookId}", Name = "GetBook")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]

        public async Task<ActionResult<BookDto>> GetBook(Guid bookId)
        {
            var bookFromRepo = await _bookRepository.GetBookAsync(bookId);

            if (bookFromRepo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BookDto>(bookFromRepo));
        }

        /// <summary>
        /// Create a book 
        /// </summary>        
        /// <param name="bookForCreation">The book to create</param>
        /// <returns>An ActionResult of type Book</returns>
        /// <response code="422">Validation error</response>
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity,
            Type = typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary))]
        public async Task<ActionResult<BookDto>> CreateBook([FromBody] BookForCreationDto bookForCreation)
        {
            if (bookForCreation == null)
            {
                return BadRequest();
            }

            var bookToAdd = _mapper.Map<Entities.Book>(bookForCreation);
            await _bookRepository.AddBookAsync(bookToAdd);

            if (!await _bookRepository.SaveChangesAsync())
            {
                throw new Exception("Adding a book failed on save.");
            }
            await _bookRepository.SaveChangesAsync();

            return CreatedAtRoute(
                "GetBook",
                new { bookId = bookToAdd.Id },
                _mapper.Map<BookDto>(bookToAdd));
        }

        /// <summary>
        /// Delete a book
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns>An ActionResult of type Book</returns>
        [HttpDelete("{bookId}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteBook(Guid bookId)
        {

            var bookFromRepo = _bookRepository.GetBookAsync(bookId);

            if (bookFromRepo == null)
            {
                return NotFound();
            }

          //  await _bookRepository.DeleteBook(bookFromRepo);

            await _bookRepository.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Update an book 
        /// </summary>
        /// <param name="bookId">The id of the book to update</param>
        /// <param name="bookForUpdate">The book with updated values</param>
        /// <returns>An ActionResult of type Bbook</returns>
        /// <response code="422">Validation error</response>
        [HttpPut("{bookId}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity,
            Type = typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary))]
        public async Task<ActionResult<BookDto>> UpdateBook(Guid bookId, BookForUpdateDto bookForUpdate)
        {
            var bookFromRepo = await _bookRepository.GetBookAsync(bookId);
            if (bookFromRepo == null)
            {
                return NotFound();
            }

            _mapper.Map(bookForUpdate, bookFromRepo);

            //// update & save
            await _bookRepository.UpdateBook(bookFromRepo);
            await _bookRepository.SaveChangesAsync();

            // return the book
            return Ok(_mapper.Map<BookDto>(bookFromRepo));
        }

        /// <summary>
        /// Partially update an book
        /// </summary>
        /// <param name="bookId">The id of the book you want to get</param>
        /// <param name="patchDocument">The set of operations to apply to the book</param>
        /// <returns>An ActionResult of type Bbook</returns>
        /// <remarks>Sample request (this request updates the book's **first name**)  
        /// 
        /// PATCH /books/bookId
        ///     [ 
        ///         {
        ///             "op": "replace", 
        ///             "path": "/firstname", 
        ///             "value": "new first name" 
        ///         } 
        ///     ] 
        /// </remarks>
        /// <response code="200">Returns the updated book</response>
        [HttpPatch("{bookId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity,
            Type = typeof(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary))]
        public async Task<ActionResult<BookForUpdateDto>> UpdateBbook(Guid bookId,
            JsonPatchDocument<BookForUpdateDto> patchDocument)
        {
            var bookFromRepo = await _bookRepository.GetBookAsync(bookId);
            if (bookFromRepo == null)
            {
                return NotFound();
            }

            // map to DTO to apply the patch to
            var book = _mapper.Map<BookForUpdateDto>(bookFromRepo);
            patchDocument.ApplyTo(book, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);

            // if there are errors when applying the patch the patch doc 
            // was badly formed  These aren't caught via the ApiController
            // validation, so we must manually check the modelstate and
            // potentially return these errors.
            if (!ModelState.IsValid)
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }

            _mapper.Map(book, bookFromRepo);


            await _bookRepository.UpdateBook(bookFromRepo);
            await _bookRepository.SaveChangesAsync();


            return Ok(_mapper.Map<BookDto>(bookFromRepo));
        }


    }
}
