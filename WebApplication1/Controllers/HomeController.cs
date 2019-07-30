using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public HomeController()
        {
             UserList.Init();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        private JsonResult GetMyJson<T>(T user)
        {
            if (user == null)
            {
                return Json(new
                {
                    IsSuccess = false,
                    ErrorMessage = "User Yok"
                }, JsonRequestBehavior.DenyGet);
            }
            else
            {
                return Json(new
                {
                    IsSuccess = false,
                    Result = user
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetUsers()
        {
            var list = UserList.GetUsers();

            return Json(new { data = list }, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetUser(int Id)
        {
            var user = UserList.GetUser(Id);

            return GetMyJson(user);
        }

        public ActionResult AddUser(User u)
        {
            u.Id = UserList.List.Max(x => x.Id)+1;
            UserList.AddUser(u);

            return GetMyJson(u);
        }

        public ActionResult UpdateUser(User u)
        {
            UserList.UpdateUser(u);

            return GetMyJson(u);
        }

        public ActionResult DeleteUser(User u)
        {

            UserList.DeleteUser(u);

            return GetMyJson(u);
        }
    }
}