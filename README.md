```markdown
# ChatBot: A Non-Linear AI Conversation Platform

Welcome to ChatBot, a web application designed to revolutionize AI-driven conversations. Unlike traditional linear chat interfaces, ChatBot offers unparalleled flexibility, allowing users to branch conversations, regenerate, and edit responses at any point in the dialogue.

## Key Features

- **Branching Conversations**: Initiate new threads from any response to explore multiple dialogue paths simultaneously.
- **Editable Responses**: Modify and regenerate replies at any stage, providing complete control over the conversation flow.
- **Non-Linear Interaction**: Ideal for brainstorming, content creation, and complex problem-solving through a mind-mapping approach to AI chat.

## Technology Stack

- **Frontend**: [React.js](https://reactjs.org/) powered by [Vite](https://vitejs.dev/) for rapid development and hot module replacement.
- **Backend**: [Node.js](https://nodejs.org/) server handling API requests and managing conversation logic.
- **AI Engine**: Integration with the Gemini API to process and generate contextually relevant responses.

## Installation and Setup

Follow these steps to set up the ChatBot application locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Clone the Repository

```bash
git clone https://github.com/Redpandanot/ChatBot.git
cd ChatBot
```

### Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file to store environment variables:

    ```bash
    touch .env
    ```

4. Add the following variables to the `.env` file:

    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

## Usage

- **Starting a Conversation**: Enter your prompt in the input field to begin interacting with the AI.
- **Branching**: Click on any response to branch the conversation into a new thread.
- **Editing Responses**: Select any previous message to edit and regenerate the AI's reply based on the new input.

## Contributing

I welcome contributions to enhance ChatBot's functionality and user experience. To contribute:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. Make your changes and commit them with descriptive messages.
4. Push to your forked repository:

    ```bash
    git push origin feature/your-feature-name
    ```

5. Open a pull request detailing your changes.

## Acknowledgements

- [Vite](https://vitejs.dev/) for the fast and efficient build tool.
- [React.js](https://reactjs.org/) for the robust frontend library.
- [Node.js](https://nodejs.org/) for the scalable backend environment.
- [Gemini API](https://gemini.com/) for powering the AI responses.

For any questions or support, please open an issue in this repository.
``` 
