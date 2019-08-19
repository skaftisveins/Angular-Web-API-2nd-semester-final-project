using FinalProject.Models;
using FinalProject.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinalProject.Queries
{
    public class AdminQuery
    {
        private ApplicationDbContext db;

        public AdminQuery()
        {
            db = new ApplicationDbContext();
        }
        #region Herocard & Comment mapping
        private HerocardDTO ToDTO (Herocard card) => new HerocardDTO
        {
            Id = card.Id,
            Name = card.Name,
            Description = card.Description,
            Health = card.Health,
            Attack_Power = card.Attack_Power,
            Defense_Power = card.Defense_Power,
            Level_Power = card.Level_Power,
            Price = card.Price,
            Poster = card.Poster,
            Active = card.Active,
            Visible = card.Visible
        };

        private Herocard FromDTO (HerocardDTO card) => new Herocard
        {
            Name = card.Name,
            Description = card.Description,
            Health = card.Health,
            Attack_Power = card.Attack_Power,
            Defense_Power = card.Defense_Power,
            Level_Power = card.Level_Power,
            Price = card.Price,
            Poster = card.Poster,
            Active = card.Active,
            Visible = card.Visible
        };

        private CommentDTO ToDTO(Comment comment) => new CommentDTO
        {
            Id = comment.Id,
            PosterId = comment.PosterId,
            CardId = comment.CardId,
            Message = comment.Message,
            isFlagged = comment.isFlagged,
            Visible = comment.Visible,
            Created = comment.Created,
            Updated = comment.Updated
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

        public IEnumerable<HerocardDTO> AllHerocards()
        {
            return db.Herocard.ToList().Select(ToDTO);
        }

        public IEnumerable<CommentDTO> AllComments()
        {
            return db.Comment.ToList().Select(ToDTO);
        }

        public IEnumerable<ApplicationUser> AllUsers()
        {
            var users = db.Users.ToList();
            return users;
        }

        public IEnumerable<CommentDTO> FlaggedComments(bool isFlagged = true)
        {
            return db.Comment.Where(x => x.isFlagged == isFlagged).ToList().Select(ToDTO);
        }

        public bool CreateHerocard(HerocardDTO hero)
        {
            bool result;
            try
            {
                if (hero.Name == null)
                {
                    throw new Exception("Herocard name was null");
                }

                hero.Active = true;
                hero.Visible = true;

                db.Herocard.Add(FromDTO(hero));
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool UpdateHerocard(HerocardDTO hero)
        {
            bool result;
            try
            {
                var tmp = db.Herocard.Find(hero.Id);
                db.Entry(tmp).CurrentValues.SetValues(hero);

                db.SaveChanges();

                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool UpdateComment(CommentDTO comment)
        {
            bool result;
            try
            {
                var tmp = db.Comment.Find(comment.Id);
                db.Entry(tmp).CurrentValues.SetValues(comment);

                db.SaveChanges();

                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool UpdateUser(UserDTO user)
        {
            bool result;
            try
            {
                var tmp = db.Users.Find(user.Id);
                db.Entry(tmp).CurrentValues.SetValues(user);

                db.SaveChanges();

                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool DeleteHerocard(int Id)
        {
            bool result;
            try
            {
                var tmp = db.Herocard.Find(Id);
                db.Herocard.Remove(tmp);
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool DeleteComment(int Id)
        {
            bool result;
            try
            {
                var tmp = db.Comment.Find(Id);
                db.Comment.Remove(tmp);
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }

        public bool DeleteUser(string Id) // Can only delete user if he has no Cards
        {
            bool result;
            try
            {
                var tmp = db.Users.Find(Id);
                db.Users.Remove(tmp);
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