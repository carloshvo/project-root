const http = require('http');

function request(method, path, payload, callback) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (payload) {
        const data = JSON.stringify(payload);
        options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                callback(null, res.statusCode, JSON.parse(data));
            } catch (e) {
                callback(e, res.statusCode, data);
            }
        });
    });

    req.on('error', callback);
    if (payload) req.write(JSON.stringify(payload));
    req.end();
}

console.log('\n=== MOVIMENTO REMOVAL & REVERT TEST ===\n');

// Get current qty
request('GET', '/api/materials/24', null, (err, status, material) => {
    const qtyBefore = material.quantidade_estoque;
    console.log(`Initial qty: ${qtyBefore}`);

    // Get last movement
    request('GET', '/api/stock/movements', null, (err, status, movements) => {
        const lastMovement = movements[movements.length - 1];
        console.log(`Latest movement: ID=${lastMovement.id}, tipo=${lastMovement.tipo}, qty=${lastMovement.quantidade}`);

        // Delete the movement - should revert the qty
        request('DELETE', `/api/stock/movements/${lastMovement.id}`, null, (err, status, response) => {
            console.log(`Delete response: ${status}`);

            // Check final qty
            request('GET', '/api/materials/24', null, (err, status, material) => {
                const qtyAfter = material.quantidade_estoque;
                console.log(`Final qty: ${qtyAfter}`);

                const expectedQty = lastMovement.tipo === 'entrada'
                    ? qtyBefore - lastMovement.quantidade
                    : qtyBefore + lastMovement.quantidade;

                console.log(`\nExpected: ${expectedQty}, Got: ${qtyAfter}`);
                if (qtyAfter === expectedQty) {
                    console.log('✅ REVERT SUCCESSFUL: Material qty properly restored');
                } else {
                    console.log('❌ REVERT FAILED: Material qty mismatch');
                }

                process.exit(0);
            });
        });
    });
});
