// interface definida na infra porque independe do domínio
// outro exemplo de interface seria cli

export default interface Http {
  on(method: string, url: string, fn: any): Promise<void>
  listen(port: number): Promise<void>
}