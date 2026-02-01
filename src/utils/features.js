exports.getUserFeatures = (user) => {
  const isPremiumActive =
    user.isPremium &&
    (!user.premiumExpiresAt || user.premiumExpiresAt > new Date());

  return {
    isPremium: isPremiumActive,
    canEditLockedFields: isPremiumActive,
    canDownloadBranded: isPremiumActive,
    canShareBranded: isPremiumActive,
  };
};
