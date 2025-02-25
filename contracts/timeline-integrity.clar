;; Timeline Integrity Contract

(define-map events
  { id: uint }
  {
    description: (string-ascii 64),
    timestamp: uint
  }
)

(define-data-var next-id uint u0)

(define-public (record-event (description (string-ascii 64)) (timestamp uint))
  (let
    ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set events
      { id: id }
      {
        description: description,
        timestamp: timestamp
      }
    ))
  )
)

(define-read-only (get-event (id uint))
  (map-get? events { id: id })
)

