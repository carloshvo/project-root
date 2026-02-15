const http = require('http');

function request(path, method, payload, callback) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
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
                const parsed = JSON.parse(data);
                callback(null, res.statusCode, parsed);
            } catch (e) {
                callback(e, res.statusCode, data);
            }
        });
    });

    req.on('error', callback);
    if (payload) req.write(JSON.stringify(payload));
    req.end();
}

console.log('\n=== ENTRADA DE ESTOQUE TEST ===\n');

// Test 1: Check initial qty
request('/api/materials/24', 'GET', null, (err, status, material) => {
    if (err) { console.error('Error:', err); process.exit(1); }

    const qtyBefore = material.quantidade_estoque;
    console.log(`Before: qty = ${qtyBefore}`);

    // Test 2: Create entrada movement (+5)
    request('/api/stock/movements', 'POST', {
        materialId: 24,
        usuarioId: 6,
        tipo: "entrada",
        quantidade: 5
    }, (err, status, response) => {
        if (err) { console.error('Error:', err); process.exit(1); }

        console.log(`Movement Status: ${status}`);
        if (status === 201) {
            console.log(`Movement ID: ${response.id}`);
        } else {
            console.log(`Error: ${response.message}`);
        }

        // Test 3: Check final qty
        request('/api/materials/24', 'GET', null, (err, status, material) => {
            if (err) { console.error('Error:', err); process.exit(1); }

            const qtyAfter = material.quantidade_estoque;
            console.log(`After:  qty = ${qtyAfter}`);

            if (status === 201 && qtyAfter === qtyBefore + 5) {
                console.log('\n✅ ENTRADA SUCCESSFUL: qty increased by 5');
            } else if (status !== 201) {
                console.log('\n✅ ERROR EXPECTED');
            } else {
                console.log('\n❌ Transaction mismatch');
            }

            process.exit(0);
        });
    });
});
