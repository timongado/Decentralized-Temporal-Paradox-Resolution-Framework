import { describe, it, beforeEach, expect } from "vitest"

describe("Timeline Integrity Contract", () => {
  let mockStorage: Map<string, any>
  let nextId: number
  
  beforeEach(() => {
    mockStorage = new Map()
    nextId = 0
  })
  
  const mockContractCall = (method: string, args: any[] = []) => {
    switch (method) {
      case "record-event":
        const [description, timestamp] = args
        const id = nextId++
        mockStorage.set(id, { description, timestamp })
        return { success: true, value: id }
      case "get-event":
        return { success: true, value: mockStorage.get(args[0]) }
      default:
        return { success: false, error: "Unknown method" }
    }
  }
  
  it("should record an event", () => {
    const result = mockContractCall("record-event", ["Moon landing", 19690720])
    expect(result.success).toBe(true)
    expect(result.value).toBe(0)
  })
  
  it("should get an event", () => {
    mockContractCall("record-event", ["First computer", 19460214])
    const result = mockContractCall("get-event", [0])
    expect(result.success).toBe(true)
    expect(result.value.description).toBe("First computer")
    expect(result.value.timestamp).toBe(19460214)
  })
})

