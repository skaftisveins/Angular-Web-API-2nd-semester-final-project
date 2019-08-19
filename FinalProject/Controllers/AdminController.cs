using FinalProject.Models.DTO;
using FinalProject.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinalProject.Controllers
{
    [RoutePrefix("api/admin")]
    public class AdminController : ApiController
    {
        AdminQuery q = new AdminQuery();

        [Route("herocard/all"), HttpGet]
        public IHttpActionResult AllHerocards()
        {
            return Ok(q.AllHerocards());
        }

        [Route("herocard/create"), HttpPost, Authorize(Roles = "admin")]
        public IHttpActionResult CreateHerocard(HerocardDTO card)
        {
            var tmp = q.CreateHerocard(card);
            var log = new { sucess = tmp };
            if (tmp)
            {
                return Content(HttpStatusCode.OK, log);
            }
            return Content(HttpStatusCode.BadRequest, log);
        }

        [Route("herocard/update"), HttpPut, Authorize(Roles = "admin")]
        public IHttpActionResult UpdateHerocard(HerocardDTO card)
        {
            var tmp = q.UpdateHerocard(card);
            if (tmp)
            {
                return Ok(tmp);
            }
            return BadRequest("Not updated");
        }

        [Route("comment/update"), HttpPut, Authorize(Roles = "admin")]
        public IHttpActionResult UpdateComment(CommentDTO comment)
        {
            var tmp = q.UpdateComment(comment);
            if (tmp)
            {
                return Ok(tmp);
            }
            return BadRequest("Not updated");
        }

        [Route("user/update"), HttpPut, Authorize(Roles = "admin")]
        public IHttpActionResult UpdateUser(UserDTO user)
        {
            var tmp = q.UpdateUser(user);
            if (tmp)
            {
                return Ok(tmp);
            }
            return BadRequest("Not updated");
        }

        [Route("herocard/delete/{id}"), HttpDelete, Authorize(Roles = "admin")]
        public IHttpActionResult DeleteHerocard(int Id)
        {
            if (q.DeleteHerocard(Id))
            {
                return Ok("Deleted successfully");
            }
            return BadRequest("Failed to delete");
        }

        [Route("herocard/comment/delete/{id}"), HttpDelete, Authorize(Roles = "admin")]
        public IHttpActionResult DeleteComment(int Id)
        {
            if (q.DeleteComment(Id))
            {
                return Ok("Comment deleted!");
            }
            return BadRequest("Failed to delete");
        }

        [Route("comment/all"), HttpGet, Authorize(Roles = "admin")]
        public IHttpActionResult AllComments()
        {
            var comments = q.AllComments();
            if (comments != null)
            {
                return Ok(comments);
            }
            return BadRequest("Did not find any comments");
        }


        [Route("comment/all/flagged"), HttpGet, Authorize(Roles = "admin")]
        public IHttpActionResult FlaggedComments()
        {
            var flaggedComments = q.FlaggedComments();
            if (flaggedComments != null)
            {
                return Ok(flaggedComments);
            }
            return BadRequest("Did not find any flagged comments");
        }

        [Route("user/all"), HttpGet, Authorize(Roles = "admin")]
        public IHttpActionResult AllUsers()
        {
            var tmp = q.AllUsers();
            if (tmp != null)
            {
                return Content(HttpStatusCode.OK, tmp);
            }
            return Content(HttpStatusCode.BadRequest, tmp);
        }

        [Route("user/delete/{id}"), HttpDelete, Authorize(Roles = "admin")]
        public IHttpActionResult DeleteUser(string Id)
        {
            if (q.DeleteUser(Id))
            {
                return Ok("User deleted!");
            }
            return BadRequest("Failed to delete");
        }
    }
}