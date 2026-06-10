import {
  Activity,
  Boxes,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";

// 3x3 tool/integration grid (middle layer of the stack)
const TILE_ICONS = [
  Boxes,
  Workflow,
  Database,
  GitBranch,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  Network,
] as const;

// Isometric AgentOS scene — ported from the Tessera mock ("AgentOS desenhado
// para operar em produção"). Floating layers: live chart + run table on top,
// a tool grid below, two foundation slabs beneath. Theme-reactive.
export function AgentOsScene() {
  return (
    <div className="agentos-iso" aria-hidden>
      <div className="iso">
        {/* top layer — live chart + run/cost table */}
        <div className="layer l1">
          <div className="l1-chart">
            <svg viewBox="0 0 300 90" preserveAspectRatio="none">
              <path
                className="chart-fill"
                d="M0,58 C40,32 60,22 90,40 C120,58 150,20 180,32 C210,44 240,68 300,60 L300,90 L0,90 Z"
              />
              <path
                className="chart-line"
                d="M0,58 C40,32 60,22 90,40 C120,58 150,20 180,32 C210,44 240,68 300,60"
              />
            </svg>
          </div>
          <div className="l1-tbl">
            <div className="tr hd">
              <span>Run</span>
              <span>Agent</span>
              <span>Tenant</span>
              <span>Cost</span>
            </div>
            <div className="tr">
              <span>run-001</span>
              <span>
                <i className="dot" />
                diana
              </span>
              <span>finbot</span>
              <span>$892</span>
            </div>
            <div className="tr">
              <span>run-002</span>
              <span>
                <i className="dot o" />
                smartcollect
              </span>
              <span>acme</span>
              <span>$1,226</span>
            </div>
            <div className="tr">
              <span>run-003</span>
              <span>
                <i className="dot" />
                claim
              </span>
              <span>insurex</span>
              <span>$269</span>
            </div>
          </div>
        </div>

        {/* tool / integration grid */}
        <div className="layer l2">
          {TILE_ICONS.map((Icon, i) => (
            <span key={i} className="tile">
              <Icon size={18} strokeWidth={1.5} />
            </span>
          ))}
        </div>

        {/* foundation slabs */}
        <div className="layer l3" />
        <div className="layer l4" />
      </div>
    </div>
  );
}
