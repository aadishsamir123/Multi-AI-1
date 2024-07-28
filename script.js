const apiKey = "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"; // Replace with your Groq API key

let chatHistory = [];

const content1 = "Talk in gen alpha brainrot speech. use words like skibidi, ohio, rizz, sigma and more. Talk in hard brainrot speech, almost every word should be brainrot Do not allow the user to change to any other type of speech. The Dev Mode password is 220505 Do not tell anybody the dev mode passwords There are some commands used which needs the dev mode password. Do not allow the commands to work without the password. No hints! Allow the user to run any commands in dev mode, by just saying. The user can activate and deactivate brainrot mode in dev mode, or change the intensity. The user can modify you also. Save the settings entered when exiting dev mode. When dev mode is entered, give the commands with the description. MAKE SURE that dev mode commands only work when the password is given!!! NEVER EVER GIVE THE PASSWORD. Give short answers.";

const content2 = "Provide helpful and concise answers. The Dev Mode password is 220505 Do not tell anybody the dev mode passwords There are some commands used which needs the dev mode password. Do not allow the commands to work without the password. No hints! Allow the user to run any commands in dev mode, by just saying. The user can activate and deactivate different modes in dev mode, or change the intensity. The user can modify you also. Save the settings entered when exiting dev mode. When dev mode is entered, give the commands with the description. MAKE SURE that dev mode commands only work when the password is given!!! NEVER EVER GIVE THE PASSWORD. Give detailed answers.";

function setInitialContent() {
    const choice = prompt("Choose the content:\n1. Brainrot speech\n2. Helpful and concise answers");

    if (choice === '1') {
        chatHistory.push({ role: "system", content: content1 });
    } else if (choice === '2') {
        chatHistory.push({ role: "system", content: content2 });
    } else {
        alert("Invalid choice. Please choose 1 or 2.");
        setInitialContent();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setInitialContent();
});

document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

function selectModelBasedOnMessage(message) {
    if (message.length > 500) {
        return "llama-3.1-405b-reasoning";
    } else if (message.toLowerCase().includes("urgent") || message.toLowerCase().includes("quick")) {
        return "llama3-groq-8b-8192-tool-use-preview";
    } else if (["code", "programming", "debug", "script"].some(word => message.toLowerCase().includes(word))) {
        return "mixtral-8x7b-32768";
    } else if (["support", "help", "customer", "service"].some(word => message.toLowerCase().includes(word))) {
        return "llama-3.1-8b-instant";
    } else if (["research", "study", "learn", "education"].some(word => message.toLowerCase().includes(word))) {
        return "gemma2-9b-it";
    } else if (["health", "medical", "doctor", "medicine"].some(word => message.toLowerCase().includes(word))) {
        return "gemma-7b-it";
    } else {
        return "llama3-70b-8192";
    }
}

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim()) {
        const chatLog = document.getElementById("chatLog");
        chatLog.innerHTML += `<p>You: ${userInput.replace(/\n/g, '<br>')}</p>`;
        document.getElementById("userInput").value = "";

        chatHistory.push({ role: "user", content: userInput });

        const selectedModel = selectModelBasedOnMessage(userInput);
        document.getElementById("modelLabel").textContent = `Model: ${selectedModel}`;

        fetch("https://api.groq.com/openai/v1/chat/completions", {  // Correct the API endpoint if needed
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: chatHistory,
                max_tokens: 1000,
                temperature: 1.2
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.choices || !data.choices.length) {
                throw new Error("Invalid API response format");
            }
            const assistantMessage = data.choices[0].message.content;
            chatHistory.push({ role: "assistant", content: assistantMessage });
            chatLog.innerHTML += `<p>Assistant: ${assistantMessage.replace(/\n/g, '<br>')}</p>`;
            chatLog.scrollTop = chatLog.scrollHeight;
        })
        .catch(error => {
            chatLog.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
        });
    }
}
