# RevoltVoice Live

A real-time voice chat application powered by Google's Gemini AI, specifically designed for Revolt Motors customer interactions.

## 🚀 Features

- **Voice Conversation**: Natural speech-to-text and text-to-speech
- **Real-time AI**: Direct integration with Gemini AI
- **Interruption Support**: Stop AI mid-response 
- **Low Latency**: 1-2 second response times
- **Revolt Context**: AI specialized for electric motorcycles
- **Multi-modal**: Both voice and text input supported

## 📁 Folder Structure

```
src/
├── components/
│   ├── VoiceInterface.js        # Main container component
│   ├── VoiceInterfaceView.js    # UI presentation component
│   └── ui/
│       ├── ChatDisplay.js       # Conversation messages
│       ├── StatusIndicator.js   # Connection status
│       ├── TextInput.js         # Text message input
│       └── VoiceControls.js     # Microphone & interrupt buttons
├── hooks/
│   ├── useConversation.js       # Chat message management
│   ├── useGeminiAI.js          # AI integration
│   ├── useSpeechRecognition.js # Voice input handling
│   └── useTextToSpeech.js      # Voice output handling
├── config/
│   └── constants.js            # App configuration & AI prompts
├── App.js                      # Main app entry
└── index.js                    # React entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- Google AI API key ([Get here](https://aistudio.google.com))
- Modern browser with microphone support

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YashDaga17/RevoltVoice-Live
   cd RevoltVoice-Live
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API key**
   ```bash
   # Create .env.local file
   echo "REACT_APP_GOOGLE_API_KEY=your_api_key_here" > .env.local
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

1. **Click the 🎤 microphone button** to start voice conversation
2. **Speak your question** about Revolt Motors 
3. **Listen to Rev AI's response** 
4. **Click "Interrupt"** to stop AI while speaking
5. **Type messages** for text-based interaction

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production  
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Environment Variables

```bash
REACT_APP_GOOGLE_API_KEY=your_gemini_api_key
PORT=3000                      # Optional: Custom port
```

## 🚢 Deployment

### Static Hosting (Recommended)

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to any static host**
   - **Netlify**: Drag & drop `build` folder
   - **Vercel**: Connect GitHub repo
   - **GitHub Pages**: Upload `build` contents

### Environment Setup for Deployment

Set `REACT_APP_GOOGLE_API_KEY` in your hosting platform's environment variables.

## 🏗️ Architecture

- **Server-side only** - No backend required
- **Direct API calls** - Browser ↔ Gemini API  
- **Modular hooks** - Reusable logic components
- **Responsive UI** - Works on desktop and mobile

## 🔒 Security

- API keys stored in environment variables
- No server-side storage required
- HTTPS recommended for production
- Keys processed client-side only

## 📱 Browser Support

- **Chrome** (Recommended)
- **Edge** 
- **Safari**
- **Firefox** (Limited voice features)

## 🐛 Troubleshooting

### Common Issues

**"Speech recognition not supported"**
- Use Chrome, Edge, or Safari
- Ensure HTTPS in production

**"API key not found"**
- Check `.env.local` file exists
- Restart development server after adding key

**"Connection failed"**  
- Verify API key is valid
- Check internet connection
- Try refreshing the page

