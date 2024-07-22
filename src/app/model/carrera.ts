import { Curso } from "./curso";

export interface Carrera {
    descripcion: string;
    cursos: Curso[];
}
