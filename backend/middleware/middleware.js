export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
      return next()
    }
  
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    })
  }
  
  // Admin middleware
  export const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === "admin") {
      return next()
    }
  
    res.status(403).json({
      success: false,
      message: "Access denied",
    })
  }
  
  