import React, { useState, useEffect } from 'react';

const FormModal = ({
  title,
  fields,
  isOpen,
  onClose,
  onSubmit,
  initialData = {}
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}
      />

      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '600px',
          maxWidth: '95vw',
          height: '100vh',
          background: '#fff',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 32px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700 }}>
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: 20,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
          }}
        >
          {/* Content - Scrollable */}
          <div 
            className="form-content" 
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '32px',
              minHeight: 0
            }}
          >
            {fields.map((field) => (
              <div
                key={field.name}
                className={`form-group ${field.fullWidth ? 'full' : ''}`}
                style={{
                  marginBottom: '24px'
                }}
              >
                <label className="form-label" style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#374151'
                }}>
                  {field.label}
                  {field.required && (
                    <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>
                  )}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder={`Unesite ${field.label.toLowerCase()}...`}
                    value={formData[field.name] || ''}
                    required={field.required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]: e.target.value
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                ) : field.type === 'select' ? (
                  <select
                    className="form-select"
                    value={formData[field.name] || ''}
                    required={field.required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]: e.target.value
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      backgroundColor: '#fff',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Izaberite...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <div className="form-checkbox" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <input
                      type="checkbox"
                      checked={formData[field.name] || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.checked
                        })
                      }
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer'
                      }}
                    />
                    <span style={{ fontSize: '14px', color: '#374151' }}>Da</span>
                  </div>
                ) : (
                  <input
                    className="form-input"
                    type={field.type || 'text'}
                    step={field.step}
                    placeholder={`Unesite ${field.label.toLowerCase()}...`}
                    value={formData[field.name] || ''}
                    required={field.required}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]: e.target.value
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Footer - Sticky */}
          <div
            style={{
              padding: '20px 32px',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
              display: 'flex',
              gap: 12,
              flexShrink: 0
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                background: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.target.style.background = '#fff'}
            >
              Otkaži
            </button>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ 
                flex: 1,
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Sačuvaj
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default FormModal;