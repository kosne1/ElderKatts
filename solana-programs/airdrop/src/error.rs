use num_derive::FromPrimitive;
use solana_program::{
    decode_error::DecodeError,
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

#[derive(Debug, Clone, Copy, Error, FromPrimitive)]
pub enum AirdropError {
    #[error("Unexpected input in instruction id")]
    BadInstructionId,

    #[error("Unexpected input in instruction argument")]
    BadInstructionArgument,

    #[error("Acoount is not signer")]
    SignerRequired,

    #[error("Acoount is not writeable")]
    WriteableRequired,

    #[error("Acoount is not properly derived")]
    PdaCheckFailed,

    #[error("Acoount is not initialized")]
    Uninitialized,

    #[error("Wrong account address")]
    WrongAccountAddress,

    #[error("User timeout is not expired yet")]
    UserTimeout,

    #[error("Out of supply")]
    OutOfSupply,
}

impl PrintProgramError for AirdropError {
    fn print<E>(&self) {
        msg!(&self.to_string());
    }
}

impl From<AirdropError> for ProgramError {
    fn from(e: AirdropError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for AirdropError {
    fn type_of() -> &'static str {
        "Airdrop Error"
    }
}
