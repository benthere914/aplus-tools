import DiagnosticLookup from "../../../comps/tools/diagnostcLookup";
import { isMobile } from "react-device-detect";
import styles from './diagnostic.module.css'
import { useState, useEffect } from "react";
const Diagnostic = () => {

    return (  
        <>
            
            <div className={isMobile ? (styles.mobile) : (styles.default1)}>
                <DiagnosticLookup/>
            </div>
        
        </>
    );
}
 
export default Diagnostic;