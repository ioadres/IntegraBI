using Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Contracts
{
    public interface IReportService
    {
        Task<Report> Add(string name, int userId, string json);
    }
}
