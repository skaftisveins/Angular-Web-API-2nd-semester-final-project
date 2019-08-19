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
    [RoutePrefix("api/herocard")]
    public class HerocardController : ApiController
    {
        HerocardQuery q = new HerocardQuery();
        AdminQuery aq = new AdminQuery();

        [Route("all"), HttpGet, AllowAnonymous]
        public IHttpActionResult AllCards()
        {
            return Ok(q.AllHerocards());
        }

        [Route("{id}"), HttpGet, AllowAnonymous]
        public IHttpActionResult Herocard (int id)
        {
            var tmp = q.Herocard(id);
            var log = new { success = tmp };
            if (tmp != null)
            {
                return Content(HttpStatusCode.OK, log);
            }
            return Content(HttpStatusCode.BadRequest, log);
        }

        [Route("buy"), HttpPost]
        public IHttpActionResult BuyHerocard (HerocardDTO card)
        {
            var tmp = q.BuyHerocard(card.Id, User.Identity.GetUserId());
            var log = new { success = tmp };
            if (tmp)
            {
                return Content(HttpStatusCode.OK, log);
            }
            return Content(HttpStatusCode.BadRequest, log);
        }

        [Route("sell"), HttpPut]
        public IHttpActionResult SellHerocard (HerocardDTO card)
        {
            var tmp = q.SellHerocard(card.Id, User.Identity.GetUserId());
            var log = new { success = tmp };
            if (tmp)
            {
                return Content(HttpStatusCode.OK, log);
            }
            return Content(HttpStatusCode.BadRequest, log);
        }
    }
}