console.log("MailWeave is running");

function classifyEmail(emailData) {
    console.log("MailWeave: Sending to background script for classification")

    chrome.runtime.sendMessage(
        {
            action: "classifyEmail",
            data: {
                subject: emailData.subject,
                snippet: emailData.body
            }
        },
        (response) => {
            if (response.success) {
                console.log("MailWeave: Classification result:", response.data);
                console.log("MailWeave: Category:", response.data.category);
                console.log("MailWeave: Confidence:", response.data.confidence);
            } else {
                console.error("MailWeave: Classification failed:", response.error);
            }
        }
    );
}


function readEmail() {
    console.log("MailWeave: Attempting to read Emails");

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

    console.log("MailWeave: Extracted email data: ", emailData);

    chrome.storage.local.set({currentEmail: emailData},
        function() {
            console.log("MailWeave: Email data saved");
        }
    );

    classifyEmail(emailData);

    return emailData
}


function watchEmail() {
    let prevUrl = location.href;

    const observer = new MutationObserver(function(){
        const currentUrl = location.href;
        const urlUpdate = currentUrl !== prevUrl;
        const emailView = document.querySelector("h2.hP");

        if (urlUpdate && emailView) {
            prevUrl = currentUrl;
            console.log("MailWeave: URL updated, reading new email")
            setTimeout(readEmail, 500);
        } else if (emailView && !urlUpdate) {
            console.log("MailWeave: Email detected, reading");
            readEmail();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("MailWeave: Watching for email changes")
}

setTimeout(watchEmail, 2000);
setTimeout(readEmail, 3000);
