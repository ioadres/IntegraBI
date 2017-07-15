using Model.Entities;
using Repository.Contracts;
using Service.Contracts;
using System.Threading.Tasks;
using Common;
using System.Collections.Generic;
using System;
using MimeKit;
using MailKit.Net.Smtp;
using System.Security.Cryptography.X509Certificates;
using MailKit.Security;

namespace Service
{
    public class ReportService : IReportService
    {
        private IReportRepository _report;

        public ReportService(IReportRepository report)
        {
            this._report = report;
        }

        public async Task<Report> Add(ReportDto model)
        {
            var result = await _report.Add(model);
            return result;
        }

        public async Task<Report> Update(ReportDto model)
        {
            var result = await _report.Update(model);
            return result;
        }

        public async Task<IEnumerable<ReportDto>> GetReports(int userId) {
            var result = await _report.GetReports(userId);
            return result;
        }

        public async Task<ReportDto> Get(int reportId) {
            var result = await _report.Load(reportId);
            return new ReportDto() {
                UserId = result.UserId,
                Name = result.Name,
                Json = result.Json,
                ReportId = result.Id,
                DateCreated = result.DateCreated
            };
        }

        public async Task<bool> SendReport(int reportId, string emails) {
            try {
                await Task.Run(() => {                      
                    string FromAddress = "andres.prog.dev@gmail.com";
                    string FromAdressTitle = "Email from ASP.NET Core 1.1";
                    
                    string Subject = "Hello World - Sending email using ASP.NET Core 1.1";
                    string BodyContent = "ASP.NET Core was previously called ASP.NET 5. It was renamed in January 2016. It supports cross-platform frameworks ( Windows, Linux, Mac ) for building modern cloud-based internet-connected applications like IOT, web apps, and mobile back-end.";
    
                    //Smtp Server
                    string SmtpServer = "smtp.gmail.com";
                    //Smtp Port Number
                    int SmtpPortNumber = 587;
    
                    var mimeMessage = new MimeMessage();
                    mimeMessage.From.Add(new MailboxAddress(FromAdressTitle, FromAddress));
                    
                    var email_a = emails.Split(';');
                    for(int i = 0; i < email_a.Length; i++) {
                        mimeMessage.To.Add(new MailboxAddress("", email_a[i]));
                    }

                    mimeMessage.Subject = Subject;
                    mimeMessage.Body = new TextPart("plain")
                    {
                        Text = BodyContent    
                    };
    
                    using (var client = new SmtpClient())
                    { 
                        client.Connect(SmtpServer, SmtpPortNumber);
                        client.AuthenticationMechanisms.Remove("XOAUTH2");
                        client.Authenticate("", "");
                        client.Send(mimeMessage); 
                    }
                });

            return true;
            } catch(Exception e ) {
                return false;
            }
        }

        public async Task<bool> Remove(int reportId, int userId) {
            return await _report.Remove(reportId, userId);
        }

      

    }
}
