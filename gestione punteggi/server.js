const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware per il parsing del corpo della richiesta (JSON)
app.use(express.json());

// Connettersi a MongoDB (assicurati di avere una connessione MongoDB attiva)
mongoose.connect('mongodb://localhost:27017/punteggi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database MongoDB connesso');
}).catch((err) => {
  console.error('Errore di connessione al DB:', err);
});

// Schema del punteggio
const punteggioSchema = new mongoose.Schema({
  squadra1: String,
  squadra2: String,
  punteggio: Number,  // 1 se ha vinto, 0 se non si è presentata
  data: Date
});

// Modello per la raccolta "punteggi"
const Punteggio = mongoose.model('Punteggio', punteggioSchema);

// Endpoint POST per inserire un punteggio
app.post('/inserisci-punteggio', async (req, res) => {
  try {
    const { squadra1, squadra2, punteggio, data } = req.body;
    
    // Creare un nuovo punteggio
    const nuovoPunteggio = new Punteggio({ squadra1, squadra2, punteggio, data });
    await nuovoPunteggio.save();
    
    res.status(201).send('Punteggio inserito con successo!');
  } catch (err) {
    console.error('Errore durante l\'inserimento del punteggio:', err);
    res.status(500).send('Errore nel salvataggio del punteggio');
  }
});

// Avvia il server sulla porta 3000
app.listen(3000, () => {
  console.log('Server in esecuzione su http://localhost:3000');
});


