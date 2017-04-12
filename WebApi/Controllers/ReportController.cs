using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entities;
using Service.Contract;
using Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers 
{
    [Authorize(Policy = "Base")]
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        private IReportService _report;
        public ReportController(IReportService _report)
        {
            this._report = _report;
        }

        // GET api/values   
        [HttpGet("Add")]
        public async Task<Report> Add(string name, string json)
        {
            var userId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;
            var result = await this._report.Add(name, int.Parse(userId), json);
            return result;
        }
    }
}
