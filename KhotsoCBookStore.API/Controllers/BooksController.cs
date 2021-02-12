using AutoMapper;
using KhotsoCBookStore.API.Models;
using KhotsoCBookStore.API.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KhotsoCBookStore.API.Controllers
{
    [Route("api/authors/{authorId}/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;

        public BooksController(
            IBookRepository bookRepository,
            IAuthorRepository authorRepository,
            IMapper mapper)
        {
            _bookRepository = bookRepository ?? throw new ArgumentNullException(nameof(bookRepository));
            _authorRepository = authorRepository ?? throw new ArgumentNullException(nameof(authorRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks(
        Guid authorId)
        {
            if (!await _authorRepository.AuthorExistsAsync(authorId))
            {
                return NotFound();
            }

            var booksFromRepo = await _bookRepository.GetBooksAsync(authorId);
            return Ok(_mapper.Map<IEnumerable<BookDto>>(booksFromRepo));
        }

        [HttpGet("{bookId}")]
        public async Task<ActionResult<BookDto>> GetBook(
            Guid authorId,
            Guid bookId)
        {
            if (!await _authorRepository.AuthorExistsAsync(authorId))
            {
                return NotFound();
            }

            var bookFromRepo = await _bookRepository.GetBookAsync(authorId, bookId);
            if (bookFromRepo == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<BookDto>(bookFromRepo));
        }


        [HttpPost()]
        public async Task<ActionResult<BookDto>> CreateBook(
            Guid authorId,
            [FromBody] BookForCreationDto bookForCreation)
        {
            if (!await _authorRepository.AuthorExistsAsync(authorId))
            {
                return NotFound();
            }

            var bookToAdd = _mapper.Map<Entities.Book>(bookForCreation);
            _bookRepository.AddBook(bookToAdd);
            await _bookRepository.SaveChangesAsync();

            return CreatedAtRoute(
                "GetBook",
                new { authorId, bookId = bookToAdd.Id },
                _mapper.Map<BookDto>(bookToAdd));
        }

        //[HttpDelete("{bookId}")]
        //public ActionResult DeleteBookForAuthor(Guid authorId, Guid bookId)
        //{
        //    var authourFromRepo =  _authorRepository.GetAuthorAsync(authorId); 

        //    if (authourFromRepo == null)
        //    {
        //        return NotFound();
        //    }

        //    var bookForAuthorFromRepo = _bookRepository.GetBookForAuthorAsync(authorId, bookId);

        //    if (bookForAuthorFromRepo == null)
        //    {
        //        return NotFound();
        //    }

        //    _bookRepository.DeleteBook(bookForAuthorFromRepo)
        //    _authorRepository.(bookForAuthorFromRepo);
        //    _authorRepository.Save();

        //    return NoContent();
        //}

        //[HttpPut("{bookId}")]
        //public IActionResult UpdateBookForAuthor(Guid authorId,  Guid bookId,  BookForUpdateDto book)
        //{
        //    if (!_authorRepository.AuthorExists(authorId))
        //    {
        //        return NotFound();
        //    }

        //    var bookForAuthorFromRepo = _authorRepository.GetBook(authorId, bookId);

        //    if (bookForAuthorFromRepo == null)
        //    {
        //        var bookToAdd = _mapper.Map<Entities.Book>(book);
        //        bookToAdd.Id = bookId;

        //        _authorRepository.(authorId, bookToAdd);

        //        _authorRepository.Save();

        //        var bookToReturn = _mapper.Map<BookDto>(bookToAdd);

        //        return CreatedAtRoute("GetBookForAuthor",
        //            new { authorId, bookId = bookToReturn.Id },
        //            bookToReturn);
        //    }

        //    // map the entity to a BookForUpdateDto
        //    // apply the updated field values to that dto
        //    // map the BookForUpdateDto back to an entity
        //    _mapper.Map(book, bookForAuthorFromRepo);

        //    _authorRepository.UpdateBook(bookForAuthorFromRepo);

        //    _authorRepository.Save();
        //    return NoContent();
        //}

        //[HttpPatch("{bookId}")]
        //public ActionResult PartiallyUpdateBookForAuthor(Guid authorId,
        //    Guid bookId,
        //    JsonPatchDocument<BookForUpdateDto> patchDocument)
        //{
        //    if (!_authorRepository.AuthorExists(authorId))
        //    {
        //        return NotFound();
        //    }

        //    var bookForAuthorFromRepo = _authorRepository.GetBook(authorId, bookId);

        //    if (bookForAuthorFromRepo == null)
        //    {
        //        var bookDto = new BookForUpdateDto();
        //        patchDocument.ApplyTo(bookDto, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);

        //        if (!TryValidateModel(bookDto))
        //        {
        //            return ValidationProblem(ModelState);
        //        }

        //        var bookToAdd = _mapper.Map<Entities.Book>(bookDto);
        //        bookToAdd.Id = bookId;

        //        _authorRepository.AddBook(authorId, bookToAdd);
        //        _authorRepository.Save();

        //        var bookToReturn = _mapper.Map<BookDto>(bookToAdd);

        //        return CreatedAtRoute("GetBookForAuthor",
        //            new { authorId, bookId = bookToReturn.Id },
        //            bookToReturn);
        //    }

        //    var bookToPatch = _mapper.Map<BookForUpdateDto>(bookForAuthorFromRepo);
        //    // add validation
        //    patchDocument.ApplyTo(bookToPatch, (Microsoft.AspNetCore.JsonPatch.Adapters.IObjectAdapter)ModelState);

        //    if (!TryValidateModel(bookToPatch))
        //    {
        //        return ValidationProblem(ModelState);
        //    }

        //    _mapper.Map(bookToPatch, bookForAuthorFromRepo);

        //    _authorRepository.UpdateBook(bookForAuthorFromRepo);

        //    _authorRepository.Save();

        //    return NoContent();
        //}




    }
}
