import { useState, useCallback } from 'react';
import {
  WORKER, INITIAL_JOBS, INITIAL_MISSED, INITIAL_TRANSACTIONS,
  INITIAL_NOTIFICATIONS, INITIAL_CHAT, EARNINGS_TODAY
} from '../data/mockData';

export function useAppState() {
  // ── Navigation ──────────────────────────────────────────────────────────────
  const [page, setPage]           = useState('landing'); // landing | dashboard
  const [dashTab, setDashTab]     = useState('home');    // home|jobs|map|wallet|profile|safety|analytics|notifications

  // ── Worker ──────────────────────────────────────────────────────────────────
  const [isOnline, setIsOnline]   = useState(true);
  const [wallet, setWallet]       = useState(WORKER.wallet);

  // ── Jobs ────────────────────────────────────────────────────────────────────
  const [availableJobs, setAvailableJobs] = useState(INITIAL_JOBS);
  const [missedJobs,    setMissedJobs]    = useState(INITIAL_MISSED);
  const [activeJob,     setActiveJob]     = useState(null);

  // ── Modals & Panels ─────────────────────────────────────────────────────────
  const [jobPopup,      setJobPopup]      = useState(null);    // job object
  const [showChat,      setShowChat]      = useState(false);
  const [showCashout,   setShowCashout]   = useState(false);
  const [showTip,       setShowTip]       = useState(false);
  const [showCompletion,setShowCompletion]= useState(null);   // completed job
  const [showSOS,       setShowSOS]       = useState(false);

  // ── Transactions & Notifications ─────────────────────────────────────────────
  const [transactions,   setTransactions]   = useState(INITIAL_TRANSACTIONS);
  const [notifications,  setNotifications]  = useState(INITIAL_NOTIFICATIONS);
  const [chat,           setChat]           = useState(INITIAL_CHAT);

  // ── Toast ───────────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = 'info') => {
    const id = Date.now();
    setToast({ id, msg, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [{ id: `n-${Date.now()}`, read: false, time: 'Just now', ...notif }, ...prev]);
  }, []);

  const addTransaction = useCallback((tx) => {
    setTransactions(prev => [{ id: `tx-${Date.now()}`, time: 'Just now', ...tx }, ...prev]);
  }, []);

  // ── Job Actions ─────────────────────────────────────────────────────────────
  const acceptJob = useCallback((job) => {
    setActiveJob({ ...job, status: 'en_route' });
    setAvailableJobs(prev => prev.filter(j => j.id !== job.id));
    setJobPopup(null);
    setDashTab('home');
    showToast(`Job accepted! Head to ${job.area}.`, 'success');
    addNotification({ category: 'jobs', icon: '✅', title: 'Job Accepted', body: `${job.type} — ₹${job.pay}` });
  }, [showToast, addNotification]);

  const rejectJob = useCallback((jobId) => {
    const job = availableJobs.find(j => j.id === jobId);
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    setJobPopup(null);
    if (job) setMissedJobs(prev => [{ ...job, id: `m-${Date.now()}` }, ...prev]);
    showToast('Job rejected.', 'info');
  }, [availableJobs, showToast]);

  const expireJob = useCallback((jobId) => {
    const job = availableJobs.find(j => j.id === jobId);
    setAvailableJobs(prev => prev.filter(j => j.id !== jobId));
    setJobPopup(null);
    if (job) {
      setMissedJobs(prev => [{ ...job, id: `m-${Date.now()}` }, ...prev]);
      showToast('Job timed out — moved to Missed Jobs.', 'warning');
    }
  }, [availableJobs, showToast]);

  const claimMissedJob = useCallback((missedJob) => {
    setActiveJob({ ...missedJob, status: 'en_route' });
    setMissedJobs(prev => prev.filter(j => j.id !== missedJob.id));
    setDashTab('home');
    showToast(`Claimed! Head to ${missedJob.area}.`, 'success');
  }, [showToast]);

  const completeJob = useCallback(() => {
    if (!activeJob) return;
    const earned = activeJob.pay;
    setWallet(prev => prev + earned);
    setShowCompletion(activeJob);
    addTransaction({ label: activeJob.type, amount: +earned, type: 'earn' });
    addNotification({ category: 'earnings', icon: '💰', title: 'Payment Received', body: `₹${earned} added to wallet` });
    setActiveJob(null);
    setShowChat(false);
    showToast(`₹${earned} added to wallet!`, 'success');
  }, [activeJob, addTransaction, addNotification, showToast]);

  const sendTip = useCallback((amount) => {
    setWallet(prev => prev + amount);
    addTransaction({ label: 'Customer Tip', amount: +amount, type: 'tip' });
    addNotification({ category: 'earnings', icon: '🎁', title: 'Tip Received', body: `You received a ₹${amount} tip` });
    setShowTip(false);
    showToast(`₹${amount} tip received! 🎉`, 'success');
  }, [addTransaction, addNotification, showToast]);

  const cashOut = useCallback((amount, method) => {
    setWallet(prev => prev - amount);
    addTransaction({ label: `${method} Withdrawal`, amount: -amount, type: 'withdraw' });
    setShowCashout(false);
    showToast(`₹${amount} transferred via ${method}!`, 'success');
  }, [addTransaction, showToast]);

  const sendChatMessage = useCallback((text) => {
    setChat(prev => [...prev, { id: `c-${Date.now()}`, sender: 'worker', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    page, setPage,
    dashTab, setDashTab,
    isOnline, setIsOnline,
    wallet,
    availableJobs, setAvailableJobs,
    missedJobs,
    activeJob,
    jobPopup, setJobPopup,
    showChat, setShowChat,
    showCashout, setShowCashout,
    showTip, setShowTip,
    showCompletion, setShowCompletion,
    showSOS, setShowSOS,
    transactions,
    notifications,
    chat,
    toast,
    unreadCount,
    acceptJob, rejectJob, expireJob, claimMissedJob,
    completeJob, sendTip, cashOut,
    sendChatMessage, markAllNotificationsRead,
    showToast,
  };
}
