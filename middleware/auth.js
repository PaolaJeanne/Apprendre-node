const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('🔐 [AUTH] Début - URL:', req.url);
    console.log('🔐 Method:', req.method);
    console.log('🔐 Body présent?', req.body ? 'OUI' : 'NON');
    console.log('🔐 Body content:', req.body);
    
    try {
        // Vérifier que le header Authorization existe
        if (!req.headers.authorization) {
            console.log('❌ Pas de header Authorization');
            return res.status(401).json({ error: 'Token manquant !' });
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log('❌ Token manquant après Bearer');
            return res.status(401).json({ error: 'Format Bearer <token> attendu !' });
        }

        console.log('🔐 Token reçu, vérification...');
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'RANDOM_TOKEN_SECRET');
        console.log('✅ Token décodé:', decodedToken);
        console.log('✅ userId présent?', 'userId' in decodedToken);
        console.log('✅ userId valeur:', decodedToken.userId);
        
        // CORRECTION : Vérifiez explicitement
        if (!decodedToken.userId) {
            console.error('❌ ERREUR: decodedToken.userId est undefined!');
            console.error('❌ decodedToken complet:', decodedToken);
            return res.status(401).json({ error: 'Token invalide: pas de userId' });
        }
        
        const userId = decodedToken.userId;
        
        // CORRECTION CRITIQUE : Vérifiez d'abord si req.body existe
        if (req.body && req.body.userId && req.body.userId !== userId) {
            console.log('❌ User ID mismatch');
            return res.status(403).json({ error: 'User ID non valable !' });
        }
        
        // IMPORTANT: Ajoutez req.auth
        req.auth = { userId: userId };
        console.log('✅ req.auth défini:', req.auth);
        
        next();
    } catch (error) {
        console.error('❌ JWT Error COMPLET:', error);
        console.error('❌ Message:', error.message);
        console.error('❌ Stack:', error.stack);
        res.status(401).json({
            error: 'Requête non authentifiée !'
        });
    }
};