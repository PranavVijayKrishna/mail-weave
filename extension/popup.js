document.addEventListener("DOMContentLoaded", function() {
    console.log("MailWeave: Popup loaded, checking storge");

    const displayDiv = document.getElementById('email-display');

    chrome.storage.local.get(['currentEmail'], function(result) {
        console.log("MailWeave: Storage data: ", result);

        if(result.currentEmail) {
            const email = result.currentEmail;

            displayDiv.innerHTML = `
        <div style="background: #fff; padding: 10px; border-radius: 5px;">
          <div style="font-weight: bold; color: #666; margin-top: 8px;">From:</div>
          <div style="color: #333;">${email.sender}</div>
          
          <div style="font-weight: bold; color: #666; margin-top: 8px;">Subject:</div>
          <div style="color: #333;">${email.subject}</div>
          
          <div style="font-weight: bold; color: #666; margin-top: 8px;">Date:</div>
          <div style="color: #333;">${email.date}</div>
          
          <div style="font-weight: bold; color: #666; margin-top: 8px;">Body Preview:</div>
          <div style="color: #333;">${email.body}</div>
        </div>
      `;
    } else {
      displayDiv.innerHTML = '<p style="color: #999;">No email data yet. Open an email in Gmail first!</p>';
    }
  });
});