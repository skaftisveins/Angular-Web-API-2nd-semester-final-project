using FinalProject.Models.DTO;
using FinalProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;

namespace FinalProject.Queries
{
    public class HerocardQuery
    {
        private ApplicationDbContext db;

        public HerocardQuery()
        {
            db = new ApplicationDbContext();
        }
        #region Herocard & Deck mapping
        private HerocardDTO ToDTO(Herocard card) => new HerocardDTO
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

        private Herocard FromDTO(HerocardDTO card) => new Herocard
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

        private DeckDTO ToDTO(Deck deck) => new DeckDTO
        {
            Id = deck.Id,
            OwnerId = deck.OwnerId,
            CardId = deck.CardId,
            Playable = deck.Playable,
            Available = deck.Available
        };

        private Deck FromDTO(DeckDTO deck) => new Deck
        {
            OwnerId = deck.OwnerId,
            CardId = deck.CardId,
            Playable = deck.Playable,
            Available = deck.Available
        };
        #endregion

        public IEnumerable<HerocardDTO> UserDecks(string owner)
        {
            return db.Deck.Where(x => x.OwnerId == owner).ToList().Select(x => ToDTO(x.Card));
        }

        public IEnumerable<HerocardDTO> PlayableUserDecks(string owner, bool playable)
        {
            return db.Deck.Where(x => x.OwnerId == owner && x.Playable == playable).ToList().Select(x => ToDTO(x.Card));
        }

        public IEnumerable<HerocardDTO> AllHerocards (bool active = true, bool visible = true)
        {
            return db.Herocard.Where(x => x.Visible == visible && x.Active == active).ToList().Select(ToDTO);
        }

        #region Herocard by Id
        public HerocardDTO Herocard (int Id)
        {
            HerocardDTO result;
            try
            {
                result = ToDTO(db.Herocard.SingleOrDefault(x => x.Id == Id && x.Active));
            }
            catch (Exception)
            {
                result = null;
            }

            return result;
        }
        #endregion

        #region Buy Herocard
        public bool BuyHerocard (int id, string userId)
        {
            bool result;

            var herocard = db.Herocard.Find(id);

            var user = db.Users.Find(userId);

            try
            {
                if (user.Points < herocard.Price)
                {
                    throw new Exception();
                } 

                user.Points -= herocard.Price;

                var deck = new Deck
                {
                    CardId = herocard.Id,
                    OwnerId = userId,
                    Playable = false,
                    Available = true
                };

                db.Deck.Add(deck);
                db.SaveChanges();
                result = true;
                
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Sell Herocard
        public bool SellHerocard(int id, string userId)
        {
            bool result;

            var herocard = db.Herocard.Find(id);

            var user = db.Users.Find(userId);

            var deckCard = db.Deck.Where(x => x.Available && x.OwnerId == userId && x.CardId == id).FirstOrDefault();

            try
            {
                if (!herocard.Active && deckCard != null)
                {
                    throw new Exception();
                }

                user.Points += ((herocard.Price * 2) / 3); // 30 * 2 | 60 / 3 | ~ 20 // User cannot buy and sell cards without a cost!

                db.Deck.Remove(deckCard);
                db.SaveChanges();
                result = true;

            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Random Herocards when new user registers
        public bool RandomCardsForRegisteredUser (string userId, int numCards)
        {
            bool result;
            try
            {
                // https://stackoverflow.com/questions/48087/select-n-random-elements-from-a-listt-in-c-sharp
                var cards = db.Herocard.Where(x => x.Active).OrderBy(arg => Guid.NewGuid()).Take(numCards).ToList().Select(x =>

                    new Deck
                    {
                        OwnerId = userId,
                        CardId = x.Id,
                        Available = true,
                    });

                db.Deck.AddRange(cards);
                db.SaveChanges();

                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        #endregion

        #region Set Card in Users deck to Playable
        public bool SetDeckPlayable (int id, string userId)
        {
            bool result;

            var herocard = db.Herocard.Find(id);

            var user = db.Users.Find(userId);

            var deckCard = db.Deck.Where(x => x.Available && x.OwnerId == userId && x.CardId == id).FirstOrDefault();

            try
            {
                if (!herocard.Active && deckCard != null)
                {
                    throw new Exception();
                }

                deckCard.Playable = true;

                db.SaveChanges();

                result = true;
            }
            catch (Exception)
            {
                result = false;
            }
            return result;
        }
        #endregion
    }
}