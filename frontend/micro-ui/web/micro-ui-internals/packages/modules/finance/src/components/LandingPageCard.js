import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const RenderMenuDict = ({ tree, level = 0 }) => {
  const history = useHistory();
  const [openKeys, setOpenKeys] = useState({});

  const toggle = (key) => {
    setOpenKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const indentPx = level * 16;
  const buttonBaseStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 4px',
    cursor: 'pointer',
    fontSize: '16px',
    color: "#F47738",
  };

  return Object.entries(tree).map(([key, node], idx) => {
    const meta = node._meta || {};
    const hasChildren = Object.keys(node).some(childKey => childKey !== '_meta');
    const isOpen = openKeys[key];

    return (
      <div key={level + '-' + idx}>
        <span
          style={{ ...buttonBaseStyle, paddingLeft: `${indentPx + 8}px` }}
          onClick={() => hasChildren ? toggle(key) : meta.link && (
            meta.link.includes(`${window.contextPath}/`) ? history.push(meta.link) : window.location.href = meta.link
          )}
        >
          <p>{meta.label || key}</p>
          {hasChildren && <p>{isOpen ? '-' : '+'}</p>}
        </span>
        {hasChildren && isOpen && (
          <div>
            <RenderMenuDict tree={Object.fromEntries(
              Object.entries(node).filter(([k]) => k !== '_meta')
            )} level={level + 1} />
          </div>
        )}
      </div>
    );
  });
};

const LandingPageSubMenuCard = ({ Icon, moduleName, menuDict = {}, style = {} }) => {

  return (
    <div className='employeeCard customEmployeeCard card-home home-action-cards'>
      <div className="complaint-links-container">
        <div className="header" >
          <span className="text removeHeight">{moduleName}</span>
          <span className="logo removeBorderRadiusLogo">{Icon}</span>
        </div>
        <div className="body" style={{ margin: "0px", padding: "0px" }}>
          <div className="links-wrapper" style={{ width: "90%" }}>
            <RenderMenuDict tree={menuDict} />
          </div>
        </div>
      </div>
    </div>
  );
};

LandingPageSubMenuCard.propTypes = {
  icon: PropTypes.node,
  moduleName: PropTypes.string.isRequired,
  menuDict: PropTypes.object.isRequired,
  style: PropTypes.object
};

export default LandingPageSubMenuCard;