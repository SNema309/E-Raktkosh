import { useState } from "react";

// ── Reusable sub-components ──────────────────────────────────────────────────

function SelectField({ name, options }) {
  return (
    <div style={styles.selectWrap}>
      <select name={name} style={styles.select} defaultValue="">
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span style={styles.arrow}>&#8744;</span>
    </div>
  );
}

function CheckboxGroup({ name, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0 10px" }}>
      {options.map((o) => (
        <label key={o} style={styles.rbLabel}>
          <input type="checkbox" name={name} value={o} style={styles.checkbox} />
          {o}
        </label>
      ))}
    </div>
  );
}

function RowLabel({ cbName, label }) {
  return (
    <label style={styles.cbLabel}>
      <input type="checkbox" name={cbName} style={styles.checkbox} />
      {label}
    </label>
  );
}

// ── Row definitions ──────────────────────────────────────────────────────────

const SELECT_ROWS = [
  {
    cbName: "visualCheckCb",
    label: "Visual Check",
    preOpts: ["Normal", "Abnormal", "Not Done"],
    postOpts: ["Normal", "Abnormal", "Not Done"],
    preName: "visualCheckPre",
    postName: "visualCheckPost",
  },
  {
    cbName: "bloodGroupCb",
    label: "Repeat Blood Grouping*",
    preOpts: ["A+","A-","B+","B-","AB+","AB-","O+","O-"],
    postOpts: ["A+","A-","B+","B-","AB+","AB-","O+","O-"],
    preName: "bloodGroupPre",
    postName: "bloodGroupPost",
  },
  {
    cbName: "antibodyIdCb",
    label: "Antibody identification",
    preOpts: ["Identified", "Not Identified", "Not Done"],
    postOpts: ["Identified", "Not Identified", "Not Done"],
    preName: "antibodyIdPre",
    postName: "antibodyIdPost",
  },
  {
    cbName: "hbCb",
    label: "Hemoglobin",
    preOpts: ["Normal", "Low", "High", "Not Done"],
    postOpts: ["Normal", "Low", "High", "Not Done"],
    preName: "hbPre",
    postName: "hbPost",
  },
  {
    cbName: "plasmaHbCb",
    label: "Plasma Hemoglobin",
    preOpts: ["Normal", "Elevated", "Not Done"],
    postOpts: ["Normal", "Elevated", "Not Done"],
    preName: "plasmaHbPre",
    postName: "plasmaHbPost",
  },
  {
    cbName: "urineHbCb",
    label: "Urine Hemoglobin",
    preOpts: ["Absent", "Present", "Not Done"],
    postOpts: ["Absent", "Present", "Not Done"],
    preName: "urineHbPre",
    postName: "urineHbPost",
  },
  {
    cbName: "bilirubinCb",
    label: "Bilirubin (Total/conjugated)",
    preOpts: ["Normal", "Elevated", "Not Done"],
    postOpts: ["Normal", "Elevated", "Not Done"],
    preName: "bilirubinPre",
    postName: "bilirubinPost",
  },
  {
    cbName: "plateletCb",
    label: "Platelet Count",
    preOpts: ["Normal", "Low", "High", "Not Done"],
    postOpts: ["Normal", "Low", "High", "Not Done"],
    preName: "plateletPre",
    postName: "plateletPost",
  },
  {
    cbName: "ptinrCb",
    label: "PT/INR",
    preOpts: ["Normal", "Prolonged", "Not Done"],
    postOpts: ["Normal", "Prolonged", "Not Done"],
    preName: "ptinrPre",
    postName: "ptinrPost",
  },
  {
    cbName: "xrayCb",
    label: "Chest X-ray of the patient in case of suspected TRALI",
    preOpts: ["Normal", "Abnormal", "Not Done"],
    postOpts: ["Normal", "Abnormal", "Not Done"],
    preName: "xrayPre",
    postName: "xrayPost",
  },
];

const CB_ROWS = [
  {
    cbName: "crossmatchCb",
    label: "Repeat Crossmatch*",
    preName: "crossmatchPre",
    postName: "crossmatchPost",
    options: ["Compatible", "InCompatible", "Not Done"],
  },
  {
    cbName: "antibodyScreenCb",
    label: "Repeat Antibody screen*",
    preName: "antibodyScreenPre",
    postName: "antibodyScreenPost",
    options: ["Negative", "Positive", "Not Done"],
  },
  {
    cbName: "datCb",
    label: "Direct Antiglobulin test*",
    preName: "datPre",
    postName: "datPost",
    options: ["Negative", "Positive", "Not Done"],
  },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function InvestigationsForm() {
  const [specifyError, setSpecifyError] = useState("");
  const [organismPre, setOrganismPre] = useState("");
  const [organismPost, setOrganismPost] = useState("");
  const [specifyFluid, setSpecifyFluid] = useState("");

  return (
    <div style={styles.page}>
      {/* Heading */}
      <div style={styles.sectionHeading}>Investigations*</div>

      {/* Clerical row */}
      <div style={styles.clericalRow}>
        <label style={styles.cbLabel}>
          <input type="checkbox" name="clericalChecks" style={styles.checkbox} />
          Clerical Checks
        </label>
        <div style={styles.errorField}>
          <span style={styles.errorLabel}>Specify Error Found if any:</span>
          <input
            type="text"
            name="specifyError"
            value={specifyError}
            onChange={(e) => setSpecifyError(e.target.value)}
            style={styles.errorInput}
          />
        </div>
      </div>

      {/* Main table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={{ ...styles.th, width: "28%" }}>Investigation</th>
            <th style={{ ...styles.th, width: "36%" }}>Pre-transfusion sample</th>
            <th style={{ ...styles.th, width: "36%" }}>Post-transfusion sample</th>
          </tr>
        </thead>
        <tbody>

          {/* Select-based rows */}
          {SELECT_ROWS.map((row, i) => (
            <tr key={row.cbName} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
              <td style={styles.td}><RowLabel cbName={row.cbName} label={row.label} /></td>
              <td style={styles.td}><SelectField name={row.preName} options={row.preOpts} /></td>
              <td style={styles.td}><SelectField name={row.postName} options={row.postOpts} /></td>
            </tr>
          ))}

          {/* Checkbox-group rows */}
          {CB_ROWS.map((row) => (
            <tr key={row.cbName} style={styles.trOdd}>
              <td style={styles.td}><RowLabel cbName={row.cbName} label={row.label} /></td>
              <td style={styles.td}><CheckboxGroup name={row.preName} options={row.options} /></td>
              <td style={styles.td}><CheckboxGroup name={row.postName} options={row.options} /></td>
            </tr>
          ))}

          {/* Blood culture of Blood Bag */}
          <tr style={styles.trEven}>
            <td style={styles.td}><RowLabel cbName="bcBagCb" label="Blood culture of Blood Bag*" /></td>
            <td style={styles.td}>
              <CheckboxGroup name="bcBagPre" options={["Negative", "Positive", "Not Done"]} />
            </td>
            <td style={styles.td}>
              <SelectField name="bcBagPost" options={["Negative", "Positive", "Not Done"]} />
            </td>
          </tr>

          {/* Blood culture of Patient */}
          <tr style={styles.trOdd}>
            <td style={styles.td}><RowLabel cbName="bcPatCb" label="Blood culture of Patient*" /></td>
            <td style={styles.td}>
              <CheckboxGroup name="bcPatPre" options={["Negative", "Positive", "Not Done"]} />
            </td>
            <td style={styles.td}>
              <CheckboxGroup name="bcPatPost" options={["Negative", "Positive", "Not Done"]} />
            </td>
          </tr>

          {/* Organism row */}
          <tr>
            <td style={styles.td}></td>
            <td style={{ ...styles.td, ...styles.organismCell }}>
              <textarea
                name="organismPre"
                value={organismPre}
                onChange={(e) => setOrganismPre(e.target.value)}
                placeholder="Specify Organism if positive"
                style={styles.organismInput}
              />
            </td>
            <td style={{ ...styles.td, ...styles.organismCell }}>
              <textarea
                name="organismPost"
                value={organismPost}
                onChange={(e) => setOrganismPost(e.target.value)}
                placeholder="Specify Organism if positive"
                style={styles.organismInput}
              />
            </td>
          </tr>

        </tbody>
      </table>

      {/* Non-immune hemolysis */}
      <div style={styles.bottomSection}>
        <div style={styles.bottomHeading}>
          In case of Non-immune hemolysis (which of the following was the case?)
        </div>
        <div style={styles.bottomChecks}>
          {[
            { name: "freezingPRBC", label: "Hemolysis due to freezing of PRBC Units" },
            { name: "warmingPRBC", label: "Hemolysis due to inappropriate warming of PRBC Units" },
            { name: "mechanicalDamage", label: "Mechanical damage" },
          ].map(({ name, label }) => (
            <label key={name} style={styles.cbLabel}>
              <input type="checkbox" name={name} style={styles.checkbox} />
              {label}
            </label>
          ))}
        </div>
        <div style={{ ...styles.bottomChecks, marginBottom: 6 }}>
          <label style={styles.cbLabel}>
            <input type="checkbox" name="otherFluid" style={styles.checkbox} />
            Hemolysis due to infusion of any other fluid through same BT set.
          </label>
        </div>
        <div style={{ marginTop: 4, marginBottom: 4 }}>
          <input
            type="text"
            name="specifyFluid"
            value={specifyFluid}
            onChange={(e) => setSpecifyFluid(e.target.value)}
            placeholder="Specify Fluid:"
            style={styles.fluidInput}
          />
        </div>
      </div>

      {/* ABO Mismatch */}
      <div style={styles.bottomSection}>
        <div style={styles.bottomHeading}>
          In case of ABO Mismatch (which of the following was the case?)
        </div>
        <div style={styles.bottomChecks}>
          {[
            { name: "wrongBlood",    label: "Wrong Blood in tube" },
            { name: "groupingError", label: "Grouping error" },
            { name: "labellingError",label: "Labelling error" },
            { name: "wrongUnit",     label: "Wrong unit transfused" },
          ].map(({ name, label }) => (
            <label key={name} style={styles.cbLabel}>
              <input type="checkbox" name={name} style={styles.checkbox} />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  page: {
    boxSizing: "border-box",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    fontSize: 13,
    color: "#333",
    background: "#f5f5f5",
    padding: "14px 16px 30px",
    maxWidth: "100%",
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: 700,
    color: "#333",
    marginBottom: 10,
  },
  clericalRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
    flexWrap: "wrap",
    fontWeight: 500,
  },
  errorField: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },
  errorLabel: {
    fontSize: 13,
    color: "#333",
    whiteSpace: "nowrap",
  },
  errorInput: {
    width: 320,
    height: 26,
    border: "1px solid #ccc",
    borderRadius: 5,
    padding: "0 6px",
    fontSize: 13,
    fontFamily: "inherit",
    background: "#fff",
    outline: "none",
  },
  cbLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    fontSize: 13,
    color: "#333",
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
  rbLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 13,
    color: "#333",
    cursor: "pointer",
    marginRight: 10,
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
  checkbox: {
    width: 13,
    height: 13,
    margin: 0,
    cursor: "pointer",
    flexShrink: 0,
    accentColor: "#555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },
  theadRow: {
    background: "#dce3ec",
  },
  th: {
    padding: "9px 12px",
    fontSize: 13,
    color: "#333",
    textAlign: "left",
    fontWeight: 700,
  },
  trEven: {
    borderBottom: "1px solid #e0e4e8",
    background: "#fff",
  },
  trOdd: {
    borderBottom: "1px solid #e0e4e8",
    background: "#fff",
  },
  td: {
    padding: "7px 12px",
    fontSize: 13,
    color: "#333",
    verticalAlign: "middle",
  },
  selectWrap: {
    position: "relative",
    display: "inline-block",
    width: "100%",
  },
  select: {
    width: "100%",
    height: 28,
    padding: "0 24px 0 6px",
    border: "1px solid #bbb",
    borderRadius: 4,
    fontSize: 13,
    fontFamily: "inherit",
    color: "#333",
    background: "#fff",
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    outline: "none",
    fontWeight: 500,
  },
  arrow: {
    position: "absolute",
    right: 7,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 11,
    color: "#555",
    pointerEvents: "none",
    lineHeight: 1,
  },
  organismCell: {
    padding: "5px 12px",
    background: "#fff",
  },
  organismInput: {
    width: "100%",
    height: 52,
    border: "1px solid #bbb",
    borderRadius: 2,
    padding: "6px 8px",
    fontSize: 13,
    fontFamily: "inherit",
    color: "#999",
    background: "#fff",
    resize: "none",
    outline: "none",
    verticalAlign: "top",
  },
  bottomSection: {
    marginTop: 0,
    padding: "10px 0 6px",
    borderTop: "1px solid #e0e4e8",
  },
  bottomHeading: {
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 8,
  },
  bottomChecks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px 30px",
    marginBottom: 6,
    alignItems: "center",
  },
  fluidInput: {
    width: 380,
    height: 38,
    border: "1px solid #bbb",
    borderRadius: 2,
    padding: "0 8px",
    fontSize: 13,
    fontFamily: "inherit",
    color: "#999",
    background: "#fff",
    outline: "none",
  },
};
