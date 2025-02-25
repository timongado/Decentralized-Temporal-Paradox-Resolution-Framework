;; Causal Loop Detection Contract

(define-map causal-loops
  { id: uint }
  {
    description: (string-ascii 64),
    severity: uint
  }
)

(define-data-var next-id uint u0)

(define-public (register-loop (description (string-ascii 64)) (severity uint))
  (let
    ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set causal-loops
      { id: id }
      {
        description: description,
        severity: severity
      }
    ))
  )
)

(define-read-only (get-loop (id uint))
  (map-get? causal-loops { id: id })
)

