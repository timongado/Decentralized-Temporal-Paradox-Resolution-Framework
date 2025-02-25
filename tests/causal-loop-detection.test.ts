import { describe, it, beforeEach, expect } from "vitest"

describe("Causal Loop Detection Contract", () => {
  let mockStorage: Map<string, any>
  let nextId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "register-loop":
        const [description, severity] = args
        const id = nextId++
        mockStorage.set(id, { description, severity })
        return { success: true, value: id }
      case "get-loop":
        return { success: true, value: mockStorage.get(args[0]) }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should register a causal loop", () => {
    const result = mockContractCall("register-loop", ["Grandfather paradox", 80])
    expect(result.success).toBe(true)
    expect(result.value).toBe(0)
  })
  
  it("should get a causal loop", () => {
    mockContractCall("register-loop", ["Bootstrap paradox", 70])
    const result = mockContractCall("get-loop", [0])
    expect(result.success).toBe(true)
    expect(result.value.description).toBe("Bootstrap paradox")
    expect(result.value.severity).toBe(70)
  })
})

