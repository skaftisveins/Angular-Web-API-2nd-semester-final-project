using FinalProject.Models.DTO;
using FinalProject.Queries;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProject.Controllers
{
    [RoutePrefix("api/herocard/deck")]
    public class DeckController : ApiController
    {
        HerocardQuery q = new HerocardQuery();

        [Route("all"), HttpGet]
        public IHttpActionResult AllDecks() // ... herocards for current user
        {
            var tmp = q.UserDecks(User.Identity.GetUserId());
            var log = new { card = tmp };

            if (tmp != null)
            {
                return Content(HttpStatusCode.OK, tmp);
            }
            return Content(HttpStatusCode.BadRequest, log);
        }

        [Route("playable"), HttpGet]
        public IHttpActionResult PlayableDecks() // ... playable for current user
        {
            var tmp = q.PlayableUserDecks(User.Identity.GetUserId(), true);
            if (tmp != null)
            {
                return Content(HttpStatusCode.OK, tmp);
            }
            return Content(HttpStatusCode.BadRequest, tmp);
        }

        [Route("set/playable"), HttpPut]
        public IHttpActionResult SetDeckCardPlayable(HerocardDTO card)
        {
            var tmp = q.SetDeckPlayable(card.Id, User.Identity.GetUserId());
            if (tmp)
            {
                return Content(HttpStatusCode.OK, tmp);
            }
            return Content(HttpStatusCode.BadRequest, tmp);
        }
        
    }
}