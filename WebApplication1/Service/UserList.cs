using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication1.Service
{
    public class UserList
    {
        private static List<User> _list { get; set; } //= new List<User>();
        public static List<User> List
        {
            get
            {
                return _list;
            }
            set
            {
                _list = value;
            }
        }
     
        public static void Init()
        {
            if (List == null)
            {
                List = new List<User>();
                var ra = new Random();
                for (int i = 0; i < 20; i++)
                {
                    var li = new List<string>() { "Aaa", "Bbb", "Ccc", "Ddd", "Eee", "Fff", "Ggg", "Hhh", "Iıı", "Jjj", "Kkk", "Lll", "Mmm", "Nnn", "Ooo", "Ppp", "Rrr", "Sss", "Ttt", "Uuu", "Vvv", "Yyy", "Zzz" };
                    User User = new User();
                    User.Id = i + 1;
                    User.Ad = li[ra.Next(22)];
                    User.SoyAd = li[ra.Next(22)];
                    User.Il = li[ra.Next(22)];
                    User.Ilce = li[ra.Next(22)];
                    User.Adres = li[ra.Next(22)];
                    User.PostaKodu = li[ra.Next(22)];
                    List.Add(User);
                }
            }
        }


        public static List<User> GetUsers()
        {
            if (List.Count == 0)
                Init();
            return List.OrderBy(x => x.Id).ToList();
        }

        public static User GetUser(int Id)
        {
            if (List.Count == 0)
                Init();

            var u = List.Find(x => x.Id == Id);
            return u;
        }

        public static List<User> AddUser(User u)
        {
            List.Add(u);

            return List;
        }

        public static List<User> UpdateUser(User u)
        {
            List = List.Where(x => x.Id != u.Id).ToList();
            List.Add(u);

            return List;
        }

        public static List<User> DeleteUser(User u)
        {
            List = List.Where(x => x.Id != u.Id).ToList();

            return List;
        }

    }
}