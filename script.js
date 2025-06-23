let currentSlide = 0;
        const totalSlides = 9;
        const images = document.querySelectorAll('.slide-image');

        function showImage(index) {
            
            // Remove active class 
            images.forEach((img, i) => {
                img.classList.remove('active');
            });

            // Add active class
            images[index].classList.add('active');
            
            // Update slide
            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % totalSlides;
            showImage(nextIndex);
        }

        // Auto slideshow
        setInterval(nextSlide, 2000);
    
// Musik
        let currentlyPlaying = null;
        
        function toggleSong(songId) {
            const audio = document.getElementById(songId);
            const musicCard = document.querySelector(`[data-song="${songId}"]`);
            
            if (!audio || !musicCard) {
                console.error('Audio element atau music card tidak ditemukan');
                return;
            }
            
            // If another song is playing, stop it
            if (currentlyPlaying && currentlyPlaying !== audio) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                
                // Reset the previous card's UI
                const prevCard = document.querySelector(`[data-song="${currentlyPlaying.id}"]`);
                if (prevCard) {
                    prevCard.classList.remove('playing');
                }
            }
            
            // Toggle current song
            if (audio.paused) {
                audio.play().catch(e => {
                    console.log('Playback failed:', e);
                    alert('Could not play audio. Please check if the audio file exists.');
                });
                musicCard.classList.add('playing');
                currentlyPlaying = audio;
            } else {
                audio.pause();
                musicCard.classList.remove('playing');
                currentlyPlaying = null;
            }
        }
        
        // Add event listeners to handle when songs end
        document.querySelectorAll('audio').forEach(audio => {
            audio.addEventListener('ended', function() {
                const musicCard = document.querySelector(`[data-song="${this.id}"]`);
                if (musicCard) {
                    musicCard.classList.remove('playing');
                }
                currentlyPlaying = null;
            });
        });

// Chat functionality
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatContainer = document.getElementById('chatContainer');
    const messageText = messageInput.value.trim();
    
    if (messageText === '') return;
    
    // Create user message bubble (right side)
    const userMessage = document.createElement('div');
    userMessage.className = 'flex items-start space-x-3 justify-end';
    userMessage.innerHTML = `
        <div class="flex-1 flex justify-end">
            <div class="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-2xl rounded-tr-sm px-4 py-3 max-w-md">
                <p class="text-sm">${messageText}</p>
            </div>
        </div>
        <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <i class="fas fa-user text-xs"></i>
            </div>
        </div>
    `;
    
    // Add message to chat
    chatContainer.appendChild(userMessage);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add Fiyan's auto response after a delay
    setTimeout(() => {
        addFiyanResponse(messageText);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
}

function addFiyanResponse(userMessage) {
    const chatContainer = document.getElementById('chatContainer');
    
    // Generate response based on user message
    let response = generateResponse(userMessage);
    
    const fiyanMessage = document.createElement('div');
    fiyanMessage.className = 'flex items-start space-x-3';
    fiyanMessage.innerHTML = `
        <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                F
            </div>
        </div>
        <div class="flex-1">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                <p class="text-sm">${response}</p>
            </div>
            <p class="text-xs text-gray-500 mt-1 ml-2">Fiyan</p>
        </div>
    `;
    
    // Add typing indicator first
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'flex items-start space-x-3';
    typingIndicator.id = 'typingIndicator';
    typingIndicator.innerHTML = `
        <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                F
            </div>
        </div>
        <div class="flex-1">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-md">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
            </div>
            <p class="text-xs text-gray-500 mt-1 ml-2">Fiyan ganteng sedang mengetik...</p>
        </div>
    `;
    
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Remove typing indicator and add actual message after delay
    setTimeout(() => {
        chatContainer.removeChild(typingIndicator);
        chatContainer.appendChild(fiyanMessage);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
}

function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Different responses based on keywords
    if (message.includes('bagus') || message.includes('keren') || message.includes('amazing') || message.includes('good')) {
        const positiveResponses = [
            "あリがとうございます！Senang sekali mendengarnya! 😊",
            "Terima kasih banyak! Itu membuat saya sangat senang! 🌟",
            "Wah, arigatou gozaimasu! Feedback positif seperti ini sangat berarti! ✨"
        ];
        return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
    
    if (message.includes('musik') || message.includes('lagu') || message.includes('song')) {
        return "Ah, kamu suka bagian musiknya? Itu adalah lagu-lagu favorit saya! Mana yang paling kamu suka? 🎵";
    }
    
    if (message.includes('anime')) {
        return "Anime adalah passion saya! Apakah kamu juga suka anime yang saya tampilkan? Atau ada rekomendasi anime lain? 📺✨";
    }
    
    if (message.includes('design') || message.includes('website') || message.includes('tampilan')) {
        return "Terima kasih! Saya berusaha membuat design yang menarik dengan animasi AOS dan gradient yang indah. Ada saran untuk improvement? 🎨";
    }
    
    if (message.includes('foto') || message.includes('gambar') || message.includes('image')) {
        return "Slideshow foto-fotonya cukup menarik kan? Itu adalah koleksi foto favorit saya! 📸";
    }
    
    if (message.includes('saran') || message.includes('kritik') || message.includes('improvement')) {
        return "Saran dan kritik sangat saya hargai! Apa yang bisa saya perbaiki dari website ini? 💭";
    }
    
    // Default responses
    const defaultResponses = [
        "Terima kasih sudah mampir ke website saya! Ada yang ingin kamu tanyakan? 😊",
        "Arigatou gozaimasu untuk feedbacknya! Semoga kamu enjoy exploring websitenya! 🌟",
        "Konnichiwa! Ada hal lain yang ingin kamu ketahui tentang project ini? bisa kunjungi saya di Instagram @4kaza.ae"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Auto-resize textarea
document.getElementById('messageInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});