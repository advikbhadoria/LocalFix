/**
 * Official Demo Credential & Certificate Modal Component
 */

import { modal } from './modal.js';
import { toast } from './toast.js';

export const certificateModal = {
  open(badge, workerName) {
    const storedUser = JSON.parse(localStorage.getItem('LocalFix_user') || 'null');
    const finalWorkerName = workerName || (storedUser ? storedUser.name : "Alex Rivera");
    
    const certHtml = `
      <div class="certificate-preview-frame">
        <div class="cert-watermark">VERIFIED</div>
        
        <div class="cert-header-seal">
          <i data-lucide="shield-check" style="width:36px; height:36px;"></i>
        </div>

        <div class="cert-title-org">SkillConnect Professional Verification Board</div>
        <div class="cert-main-heading">Certificate of Competency</div>
        
        <p style="font-size:0.875rem; color:#64748B; margin-bottom:1.5rem;">
          This officially recognizes that the service professional has demonstrated practical hands-on proficiency in accordance with industry standard safety and technical criteria.
        </p>

        <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em; color:#64748B;">Awarded To</div>
        <div class="cert-recipient-name">${finalWorkerName}</div>

        <div style="margin-bottom:1.5rem;">
          <div style="font-size:1.15rem; font-weight:800; color:#173B75;">${badge.skillName}</div>
          <div style="font-size:0.8125rem; font-weight:600; color:#2563EB;">Category: ${badge.category} • ${badge.level}</div>
        </div>

        <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:0.75rem 1rem; display:inline-flex; align-items:center; gap:1.5rem; text-align:left; margin-bottom:1rem;">
          <div>
            <div style="font-size:0.65rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Credential ID</div>
            <div style="font-family:monospace; font-weight:700; color:#173B75; font-size:0.8125rem;">${badge.credentialId}</div>
          </div>
          <div>
            <div style="font-size:0.65rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Issued Date</div>
            <div style="font-weight:700; color:#173B75; font-size:0.8125rem;">${badge.issuedDate}</div>
          </div>
          <div>
            <div style="font-size:0.65rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Status</div>
            <div style="color:#16A34A; font-weight:700; font-size:0.8125rem;">Verified Active</div>
          </div>
        </div>

        <div class="cert-signatures-row">
          <div class="cert-sig-block">
            <div class="sig-line">${badge.assessorName.split(' ')[0]} ${badge.assessorName.split(' ')[1] || ''}</div>
            <div class="sig-title">Certified Mentor & Assessor</div>
          </div>
          <div style="width:60px; height:60px; background:#F1F5F9; border:1px solid #CBD5E1; border-radius:6px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.55rem; color:#64748B;">
            <i data-lucide="qr-code" style="width:32px; height:32px; color:#173B75;"></i>
            <span>Scan Verify</span>
          </div>
          <div class="cert-sig-block">
            <div class="sig-line">SkillConnect Board</div>
            <div class="sig-title">Quality Assurance Director</div>
          </div>
        </div>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-secondary" onclick="window.print()">
        <i data-lucide="printer"></i> Print Certificate
      </button>
      <button class="btn btn-primary" id="download-cert-btn">
        <i data-lucide="download"></i> Download PDF (Simulated)
      </button>
    `;

    modal.open({
      title: '<i data-lucide="award" style="color:#2563EB"></i> Verified Credential & Certificate',
      bodyHtml: certHtml,
      footerHtml: footerHtml,
      maxWidth: '720px'
    });

    const dlBtn = document.getElementById('download-cert-btn');
    if (dlBtn) {
      dlBtn.onclick = () => {
        toast.success("Certificate Downloaded", `Official PDF for '${badge.skillName}' saved to your device.`);
      };
    }
  }
};
