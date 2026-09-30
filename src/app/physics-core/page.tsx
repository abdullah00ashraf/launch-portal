'use client';

import React from 'react';
import { PillarLayout } from '@/components/ui/PillarLayout';

export default function PhysicsCore() {
  const description = 
    "The ppf-contact-solver acts as the high-performance core engine for numerical multi-body simulations. Engineered to run cloth, solid, and rod boundary calculations, the engine coordinates CUDA compiled kernels (radix sorts, AABB bounding trees, ACCD continuous collision analysis) with a Rust wrapper. By utilizing PyO3 and Maturin, the engine avoids the data-translation cost of serialization and exposes zero-copy Rust arrays directly to python scripts, rendering complex physics deformation frames in milliseconds.";

  const codeSnippet = `// File: crates/ppf-cts-py/src/lib.rs
// PyO3 bindings wrapping CUDA parallel solvers
use pyo3::prelude::*;
use ppf_cts_core::{Scene, SolverContext};

#[pyfunction]
fn version() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

#[pymodule]
fn _ppf_cts_py(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add_function(wrap_pyfunction!(version, m)?)?;
    
    // Register numerical CUDA solver wrappers
    m.add_class::<app_py::PyApp>()?;
    m.add_class::<scene_py::PyScene>()?;
    m.add_class::<decoder_py::PyDecoder>()?;
    m.add_class::<render_py::PyRender>()?;
    
    Ok(())
}`;

  return (
    <PillarLayout
      title="ppf-contact-solver: CUDA-Accelerated Physics Core"
      description={description}
      codeSnippet={codeSnippet}
      targetKey="SOLVER"
      color="#10b981" // Emerald
      consoleActionLabel="SOLVE MESH BOUNDARY CONSTRAINTS"
      consoleCommandPrompt="cargo test -p ppf-cts-solver -- --nocapture"
      consoleSuccessLog="[OK] CUDA_INIT_SOLVER: parallel computation mesh solved with 0 overlapping frames."
      placeholderParam="STRESS_LIMIT_FACTOR (e.g. 0.05)"
    />
  );
}
