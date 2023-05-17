import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Popover, ArrowContainer } from 'react-tiny-popover'
import { CARD_TYPES, TYPES_BG } from 'utils'

const DeckItem = ({ item, onClick }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const type = item.data.split('\n')[0].split(' ')[0]
  console.log('TYPE', type)
  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={['left']}
      content={({ position, childRect, popoverRect }) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={'white'}
          arrowSize={10}
          arrowStyle={{ opacity: 0.5 }}
          className="popover-arrow-container"
          arrowClassName="popover-arrow"
        >
          <img
            className="bg-white bg-opacity-50 rounded-3xl"
            src={item.image}
          />
        </ArrowContainer>
      )}
    >
      <p
        className="text-gray-50 my-2 rounded-md p-2 font-bold flex justify-between items-center cursor-pointer shadow-lg"
        style={{
          textShadow: 'rgb(0 0 0) 0px 1px 3px',
          background: `linear-gradient(90deg, ${
            CARD_TYPES[item.data.split('\n')[0]]
          } 20%, rgba(207, 130, 155, 0) 70%), url(${item.image}) no-repeat`,
          backgroundSize: '24vmax',
          backgroundPosition: TYPES_BG[type],
        }}
        onClick={() => onClick(item.uuid)}
        onMouseOver={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <span>{item.data.split('\n')[1]}</span>{' '}
        <span className="bg-darker px-2 border-4 border-double">
          x{item.counts}
        </span>
      </p>
    </Popover>
  )
}

DeckItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default DeckItem
