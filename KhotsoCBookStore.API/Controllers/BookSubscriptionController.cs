using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using KhotsoCBookStore.API.Authentication;
using KhotsoCBookStore.API.Entities;
using KhotsoCBookStore.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace KhotsoCBookStore.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BookSubscriptionController : Controller
    {
        readonly IBookSubscriptionService _bookSubscriptionService;

        public BookSubscriptionController(IBookSubscriptionService bookSubscriptionService)
        {

            _bookSubscriptionService = bookSubscriptionService;

        }

        /// <summary>
        /// Get the list of books subscriptions
        /// </summary>
        /// <returns>List of book subscriptions</returns>
        [HttpGet]
        public async Task<List<BookSubscription>> Get()
        {
            return await Task.FromResult(_bookSubscriptionService.GetBooksSubscrption()).ConfigureAwait(true);
        }

        /// <summary>
        /// Get the specific book subscripption corresponding to the subBookId
        /// </summary>
        /// <param name="BookSubId"></param>
        /// <returns></returns>
        [HttpGet("{BookSubId}")]
        public IActionResult Get(int BookSubId)
        {
            BookSubscription sub = _bookSubscriptionService.GetSingleBookSubscription(BookSubId);
            if (sub != null)
            {
                return Ok(sub);
            }
            return NotFound();
        }


        /// <summary>
        /// Add a new book subscription
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public int Post([FromBody] BookSubscription sub)
        {
            _bookSubscriptionService.AddBookSubscription(sub);
            return 0;
        }


        /// <summary>
        /// Delete a particular book subscription
        /// </summary>
        /// <param name="BookSubId"></param>
        /// <returns></returns>
        [HttpDelete("{BookSubId}")]
        public IActionResult Delete(int BookSubId)
        {
            var subFromRepo = _bookSubscriptionService.GetSingleBookSubscription(BookSubId);

            if (subFromRepo == null)
            {
                return NotFound();
            }
            _bookSubscriptionService.BookDeleteSubscription(BookSubId);

            return NoContent();
        }
    }
}
