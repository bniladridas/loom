console.log('SIMPLE TEST START');
const app = document.getElementById('app');
if (app) {
    app.innerHTML = '<h1>Loom is Running - Simple Test</h1>';
    console.log('SIMPLE TEST SUCCESS');
} else {
    console.error('app NOT found');
    document.body.innerHTML = '<h1>APP NOT FOUND</h1>';
}
