const http = require('http');

// Test 1: Check initial material quantity
function checkMaterial(id, callback) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: `/api/materials/${id}`,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const material = JSON.parse(data);
                callback(null, material);
            } catch (e) {
                callback(e, null);
            }
        });
    });

    req.on('error', callback);
    req.end();
}

// Test 2: Try to create invalid movement (saida > cantidad)
function createInvalidMovement(callback) {
    const payload = JSON.stringify({
        materialId: 24,
        usuarioId: 6,
        tipo: "saida",
        quantidade: 10
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/stock/movements',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length
        }
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const response = JSON.parse(data);
                callback(null, res.statusCode, response);
            } catch (e) {
                callback(e, res.statusCode, data);
            }
        });
    });

    req.on('error', callback);
    req.write(payload);
    req.end();
}

// Run tests
console.log('\n=== TRANSACTION SAFETY TEST ===\n');

checkMaterial(24, (err, material) => {
    if (err) {
        console.error('❌ Error reading initial material:', err);
        process.exit(1);
    }

    console.log('✅ Initial Material State:');
    console.log(`   ID: ${material.id}, Code: ${material.codigo}, Qty: ${material.quantidade_estoque}\n`);

    createInvalidMovement((err, status, response) => {
        if (err) {
            console.error('❌ Error creating movement:', err);
            process.exit(1);
        }

        console.log(`Movement Request Response:`);
        console.log(`   Status Code: ${status}`);
        console.log(`   Response:`, response);
        console.log('');

        // Check if transaction worked: quantity should still be 6
        checkMaterial(24, (err, material) => {
            if (err) {
                console.error('❌ Error reading final material:', err);
                process.exit(1);
            }

            console.log('✅ Final Material State:');
            console.log(`   ID: ${material.id}, Code: ${material.codigo}, Qty: ${material.quantidade_estoque}\n`);

            if (material.quantidade_estoque === 6) {
                console.log('✅ TRANSACTION SAFE: Material quantity unchanged after failed movement');
            } else {
                console.log('❌ TRANSACTION FAILED: Material quantity was modified despite error!');
            }

            process.exit(0);
        });
    });
});
