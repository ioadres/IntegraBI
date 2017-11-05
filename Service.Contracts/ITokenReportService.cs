using Model.Entities;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;
using System.Globalization;
namespace Service.Contracts
{
    public interface ITokenReportService
    {
        Task<TokenReport> Add(TokenReportDto model);
        Task<TokenReport> Get(Guid Id);
        Task<bool> Remove(string mail, int reportId);
        Task<bool> Valid(string mail, int reportId, DateTime dateStart, DateTime dateEnd);        
    }
}
