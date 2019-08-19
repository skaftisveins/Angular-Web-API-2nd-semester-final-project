using FinalProject.Models;
using FinalProject.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace FinalProject.Queries
{
    public class CommentQuery
    {
        private ApplicationDbContext db;

        public CommentQuery()
        {
            db = new ApplicationDbContext();
        }

        #region Comment mapping
        private CommentDTO ToDTO(Comment comment) => new CommentDTO
        {
            Id = comment.Id,
            PosterId = comment.PosterId,
            CardId = comment.CardId,
            Message = comment.Message,
            isFlagged = comment.isFlagged,
            Visible = comment.Visible,
            Created = comment.Created,
            Updated = comment.Updated,
            Username = comment.Poster.UserName
        };

        private Comment FromDTO(CommentDTO comment) => new Comment
        {
            PosterId = comment.PosterId,
            CardId = comment.CardId,
            Message = comment.Message,
            isFlagged = comment.isFlagged,
            Visible = comment.Visible,
            Created = comment.Created,
            Updated = comment.Updated
        };
        #endregion

        public IEnumerable<CommentDTO> AllComments (int herocard, bool visible = true)
        {
            return db.Comment.Include(x => x.Poster).Where(x => x.CardId == herocard && x.Visible == visible).ToList().Select(ToDTO);
        }

        public IEnumerable<CommentDTO> FlaggedComments (int herocard, bool isFlagged = true)
        {
            return db.Comment.Where(x => x.CardId == herocard && x.isFlagged == isFlagged).ToList().Select(ToDTO);
        }

        public CommentDTO SingleComment (int herocard, string poster, bool visible = true)
        {
            return db.Comment.Where(x => x.PosterId == poster && x.CardId == herocard && x.Visible == visible).ToList().Select(ToDTO).FirstOrDefault();
        }

        public bool FlagComment(CommentDTO comment)
        {
            bool result;
            try
            {
                var tmp = db.Comment.Where(x => x.Id == comment.Id).SingleOrDefault();
                tmp.isFlagged = true;
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool Create(CommentDTO comment)
        {
            bool result;
            try
            {
                comment.Visible = true;
                comment.Created = DateTime.UtcNow;
                comment.Updated = DateTime.UtcNow;
                db.Comment.Add(FromDTO(comment));
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool Update (CommentDTO comment, string poster)
        {
            bool result;
            try
            {
                var tmp = db.Comment.Where(x => x.Id == comment.Id && x.PosterId == poster).SingleOrDefault();
                tmp.Message = comment.Message;
                tmp.Updated = DateTime.UtcNow;
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool Delete (int Id, string poster)
        {
            bool result;
            try
            {
                var tmp = db.Comment.Where(x => x.Id == Id && x.PosterId == poster).SingleOrDefault();
                tmp.Visible = false;
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
    }
}