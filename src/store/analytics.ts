let sessionId = sessionStorage.getItem('qi_analytics_session');
if (!sessionId) { sessionId = crypto.randomUUID(); sessionStorage.setItem('qi_analytics_session', sessionId); }
export function trackPageView(path: string) {
  fetch('/api/pageviews',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({path,sessionId})}).catch(()=>{});
}
