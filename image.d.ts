// custom.d.ts ou image.d.ts

// Declaração para arquivos PNG
declare module '*.png' {
  const content: any;
  export default content;
}

// Opcional: Adicione outras extensões que você usa
declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}
