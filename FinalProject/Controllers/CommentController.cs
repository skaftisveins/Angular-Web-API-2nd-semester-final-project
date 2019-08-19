using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Web.Http;
using FinalProject.Queries;
using Microsoft.AspNet.Identity;
using FinalProject.Models.DTO;

namespace FinalProject.Controllers
{
    [RoutePrefix("api/herocard/comment")]
    public class CommentController : ApiController
    {
        CommentQuery q = new CommentQuery();

        [Route("all/{card}"), HttpGet]
        public IHttpActionResult AllComments(int card) // ...for current card
        {
            return Ok(q.AllComments(card));
        }

        [Route("all/{card}/flagged"), HttpGet]
        public IHttpActionResult FlaggedComments(int card) // ...flagged comments for current card
        {
            return Ok(q.FlaggedComments(card));
        }

        [Route("{id}"), HttpGet]
        public IHttpActionResult SingleComment (int Id)
        {
            var comment = q.SingleComment(Id, User.Identity.GetUserId());
            if (comment != null)
            {
                return Ok(comment);
            }
            return BadRequest("Did not find comment!");
        }

        [Route("create"), HttpPost]
        public IHttpActionResult Create(CommentDTO comment)
        {
            comment.PosterId = User.Identity.GetUserId();
            if (q.Create(comment))
            {
                return Ok("Comment for herocard created successfully!");
            }
            return BadRequest("Failed to create");
        }

        [Route("update"), HttpPut]
        public IHttpActionResult Update(CommentDTO comment)
        {
            if (q.Update(comment, User.Identity.GetUserId()))
            {
                return Ok("Comment for herocard updated successfully!");
            }
            return BadRequest("Failed to update");
        }

        [Route("delete/{id}"), HttpDelete]
        public IHttpActionResult Delete (int Id)
        {
            if (q.Delete(Id, User.Identity.GetUserId()))
            {
                return Ok("Comment deleted!");
            }
            return BadRequest("Failed to delete");
        }

        [Route("flag"), HttpPut]
        public IHttpActionResult FlagComment(CommentDTO comment)
        {
            if (q.FlagComment(comment))
            {
                return Ok("Comment Flagged!");
            }
            return BadRequest("Failed to flag comment");
        }
        
    }
}