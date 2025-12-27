import { useEffect, useState, useCallback } from "react";
import { FiTarget, FiSearch, FiX, FiMapPin, FiNavigation } from "react-icons/fi";
import "../css/LocationModal.css";

export default function LocationModal({ open, onClose, onSelectLocation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (open) { setInput(""); setSuggestions([]); }
  }, [open]);

  const fetchPredictions = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 3) { setSuggestions([]); return; }
      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}&limit=5&dedupe=1&addressdetails=1`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) { console.error("Location Error:", error); }
    }, 400), []
  );

  useEffect(() => { fetchPredictions(input); }, [input, fetchPredictions]);

  const handleSelect = (item) => {
    const locationData = {
      formatted_address: item.display_name,
      lat: item.lat,
      lng: item.lon,
      city: item.address?.city || item.address?.town || item.address?.village,
      state: item.address?.state,
    };
    onSelectLocation(locationData);
    onClose();
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`);
        if (res.ok) {
          const data = await res.json();
          onSelectLocation({
            formatted_address: data.display_name,
            lat: latitude, lng: longitude,
            city: data.address?.city || data.address?.town || data.address?.village,
            state: data.address?.state,
          });
          onClose();
        }
      } catch (err) { alert("Could not fetch address."); }
      finally { setLoading(false); }
    }, () => setLoading(false));
  };

  if (!open) return null;

  return (
    <div className="loc-redesign-overlay" onClick={onClose}>
      <div className="loc-redesign-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="loc-redesign-header">
          <div>
            <h3 className="loc-main-title">Change Location</h3>
            <p className="loc-sub-title">Enter your delivery area</p>
          </div>
          <button className="loc-close-circle" onClick={onClose}><FiX /></button>
        </div>

        {/* Search Bar */}
        <div className="loc-input-wrapper">
          <FiSearch className="search-icon-fixed" />
          <input
            className="loc-modern-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for area, street name..."
            autoFocus
          />
        </div>

        {/* GPS Option */}
        <button 
          className={`loc-current-btn ${loading ? 'is-locating' : ''}`} 
          onClick={useCurrentLocation}
          disabled={loading}
        >
          <div className="gps-icon-ring">
            <FiNavigation className={loading ? 'animate-pulse' : ''} />
          </div>
          <div className="gps-text">
            <span>{loading ? "Detecting..." : "Use current location"}</span>
            <small>Using GPS for better accuracy</small>
          </div>
        </button>

        {/* Suggestions */}
        <div className="loc-scroll-area">
          {suggestions.length > 0 && <p className="section-label">SEARCH RESULTS</p>}
          {suggestions.map((s, index) => {
            const parts = s.display_name.split(",");
            return (
              <div key={index} className="loc-item-new" onClick={() => handleSelect(s)}>
                <div className="loc-pin-bg"><FiMapPin /></div>
                <div className="loc-text-group">
                  <span className="loc-primary">{parts[0]}</span>
                  <span className="loc-secondary">{parts.slice(1).join(",")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}