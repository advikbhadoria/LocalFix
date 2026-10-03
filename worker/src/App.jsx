import LandingPage from './components/landing/LandingPage';
import Dashboard   from './components/dashboard/Dashboard';
import Toast       from './components/ui/Toast';
import { useAppState } from './hooks/useAppState';

export default function App() {
  const state = useAppState();

  return (
    <>
      <Dashboard
        isOnline={state.isOnline}
        setIsOnline={state.setIsOnline}
        wallet={state.wallet}
        availableJobs={state.availableJobs}
        missedJobs={state.missedJobs}
        activeJob={state.activeJob}
        jobPopup={state.jobPopup}
        setJobPopup={state.setJobPopup}
        showChat={state.showChat}
        setShowChat={state.setShowChat}
        showCashout={state.showCashout}
        setShowCashout={state.setShowCashout}
        showCompletion={state.showCompletion}
        setShowCompletion={state.setShowCompletion}
        transactions={state.transactions}
        notifications={state.notifications}
        chat={state.chat}
        unreadCount={state.unreadCount}
        acceptJob={state.acceptJob}
        rejectJob={state.rejectJob}
        expireJob={state.expireJob}
        claimMissedJob={state.claimMissedJob}
        completeJob={state.completeJob}
        cashOut={state.cashOut}
        sendChatMessage={state.sendChatMessage}
        markAllNotificationsRead={state.markAllNotificationsRead}
        showToast={state.showToast}
        onLanding={() => state.setPage('dashboard')}
      />
      <Toast toast={state.toast} />
    </>
  );
}
