//! Property-based tests for calculate_claimable_amount math.
//!
//! Run with: cargo test --test fuzz_claimable

use proptest::prelude::*;

/// Mirrors the core streaming math from `internal_settle` / `claimable_amount_for_session`.
/// rate * elapsed, capped at deposit — must never panic or overflow.
fn calculate_claimable(rate: i128, time_elapsed: u64, deposit: i128) -> i128 {
    let streamed = rate.saturating_mul(time_elapsed as i128);
    let total = streamed; // accrued_amount starts at 0 for simplicity
    if total > deposit {
        deposit
    } else {
        total
    }
}

proptest! {
    #[test]
    fn no_panic_or_overflow(
        rate in 0i128..=1_000_000i128,
        time_elapsed in 0u64..=86_400u64,   // up to 1 day in seconds
        deposit in 0i128..=1_000_000_000i128,
    ) {
        let result = calculate_claimable(rate, time_elapsed, deposit);
        // Result must be non-negative
        prop_assert!(result >= 0);
        // Result must never exceed the deposit
        prop_assert!(result <= deposit);
    }

    #[test]
    fn zero_rate_yields_zero(
        time_elapsed in 0u64..=86_400u64,
        deposit in 0i128..=1_000_000_000i128,
    ) {
        prop_assert_eq!(calculate_claimable(0, time_elapsed, deposit), 0);
    }

    #[test]
    fn zero_elapsed_yields_zero(
        rate in 0i128..=1_000_000i128,
        deposit in 0i128..=1_000_000_000i128,
    ) {
        prop_assert_eq!(calculate_claimable(rate, 0, deposit), 0);
    }

    #[test]
    fn capped_at_deposit(
        rate in 1i128..=1_000_000i128,
        time_elapsed in 1u64..=86_400u64,
        deposit in 0i128..=1_000i128,   // small deposit to force cap
    ) {
        let result = calculate_claimable(rate, time_elapsed, deposit);
        prop_assert!(result <= deposit);
    }
}
