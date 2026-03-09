import { createContext } from "react";
import type { GpuContextType } from "./types/gpu";

const GpuContext = createContext<GpuContextType | null>(null);

export default GpuContext;
