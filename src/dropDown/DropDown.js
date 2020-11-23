import React, { useEffect, useState } from "react";
import './dropDown.css'

const DropDown = ({ data, multiSelect, placeholder, preloadFunc, onChangeCallback }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [showList, setShowList] = useState(true)
  const [dataArr, setDataArr] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load data
  useEffect(() => {

    let objToArr = () => {
      setIsLoading(true)
      if (!Array.isArray(data)) {
        for (let key in data) {
          if (!Array.isArray(data[key])) {
            objToArr(data[key])
          } else {
            setDataArr(data[key])
          }
        }
      }
    }

    objToArr()
    if (preloadFunc) {
      setDataArr(preloadFunc(data))
    }
    setIsLoading(false)
  }, [data])

  // onChangeCallback
  useEffect(() => {
    !isLoading && onChangeCallback(selectedItems)
  }, [selectedItems])

  const setItem = (item) => {
    // Remove
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item))
    } else {
      // Add
      if (multiSelect) {
        setSelectedItems([...selectedItems, item])
      } else {
        if (selectedItems.length === 0) {
          setSelectedItems([...selectedItems, item])
        }
      }
    }
  }

  const getSelectedItems = () => {
    return selectedItems.map((item, index) => {
      let res = []
      for (let x of dataArr) {
        if (x.id === item) {
          res.push(
            <div key={index + item} className={'selected-items__item'}>
              <div>
                {x.name}
              </div>
              <button className={'selected-item__button'} onClick={() => setItem(item)}> X</button>
            </div>
          )
        }
      }
      return res

    })
  }

  const getItems = () => {

    const icons = [
      { symbol: 'BTC', icon: 'B' },
      { symbol: 'XRP', icon: 'X' },
      { symbol: 'ETH', icon: 'E' },
      { symbol: 'LTC', icon: 'L' },
      { symbol: 'BCC', icon: 'B' },
      { symbol: 'EOS', icon: 'E' },
      { symbol: 'BNB', icon: 'B' },
      { symbol: 'USDT', icon: 'T' },
    ]

    const getSymbol = (symbol) => {
      for (let i of icons) {
        if (i.symbol === symbol) return i.icon
      }
    }

    return dataArr.map((item, i) => {
      let res = []
      if (item.name.toLowerCase().includes(search) || search === '') res.push(
        <div className={'list-item'}>

          <div className={'list-item__position'}>

            <div className={'list-item__icon'}>
              {getSymbol(item.symbol)}
            </div>

            <div>
              <div className={'list-item__position'}>
                <div className={'list-item__name'}>
                  {item.name}
                </div>
                <div className={'list-item__currency'}>
                  {item.currentPrice}{item.currency}
                </div>
              </div>

              <div className={'list-item__change'}>
                {item.dayChange}%
              </div>
            </div>

          </div>

          <button
            className={'list__button ' + (selectedItems.includes(item.id) ? 'list__button--selected' : 'list__button--unselected')}
            onClick={() => setItem(item.id)}
          >
            L
          </button>

        </div>
      )
      return res
    })

  }

  return (
    <div className={"dropDown-container"}>

      <div className={'selectedItems-container flex-between flex-row'}>

        <div className={'flex1'}>
          <div className={'selected-items'}>
            {getSelectedItems()}
          </div>
          <input
            className={'selectedItems-container__search'}
            type="text"
            placeholder={placeholder}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <button
            className={'selectedItems-container__button'}
            onClick={() => setShowList(!showList)}
          >
            {showList === true ? '^' : 'v'}
          </button>
        </div>

      </div>

      {showList === true &&
      <div className={'list'}>
        {getItems()}
      </div>
      }

    </div>
  )
}

export default DropDown
