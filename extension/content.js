console.log("MailWeave is running");

function readEmail() {
    console.log("MailWeave is attempting to read Emails");

    const emailSubject = document.querySelector("h2.hP");
    const subject = emailSubject ? emailSubject.textContent : "Subject not found";

    const emailBody = document.querySelector("div.a3s.aiL");
    const body = emailBody ? emailBody.textContent : "Body not found";

    const emailSender = document.querySelector("span.gD");
    const sender = emailSender ? emailSender.getAttribute("email") : "Sender not found";

    const emailDate = document.querySelector("span.g3");
    const date = emailDate ? emailDate.getAttribute("title") : "Date not found";

    const emailData = {
        subject: subject,
        sender: sender,
        date: date,
        body: body.substring(0, 250) + "..."
    };

    console.log("MailWeave extracted email data: ", emailData);

    chrome.storage.local.set({currentEmail: emailData},
        function() {
            console.log("MailWeave email data saved");
        }
    );

    return emailData
}